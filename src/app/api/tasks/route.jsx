import connectDB from '@/lib/db';
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import Task from '@/models/Task';

export async function GET(request) {
  try {
    await connectDB();

    const token = await getToken({ req: request });
    if (!token || !token.sub) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Set a reasonable timeout for the query
    const tasks = await Task.find({ userId: token.sub })
      .select('-__v')
      .sort({ createdAt: -1 })
      .lean()
      .maxTimeMS(5000); // 5 second timeout

    return NextResponse.json({ tasks });

  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tasks', details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();

    const token = await getToken({ req: request });
    if (!token || !token.sub) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const data = await request.json();
    const task = await Task.create({
      ...data,
      userId: token.sub,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    return NextResponse.json({ task }, { status: 201 });

  } catch (error) {
    console.error('Error creating task:', error);
    return NextResponse.json(
      { error: 'Failed to create task', details: error.message },
      { status: 500 }
    );
  }
}