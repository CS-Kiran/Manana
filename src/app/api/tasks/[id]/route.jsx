import connectDB from '@/lib/db';
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import Task from '@/models/Task';

export async function PATCH(request, context) {
  try {
    await connectDB();

    const token = await getToken({ req: request });
    if (!token || !token.sub) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { params } = context;
    const data = await request.json();
    const task = await Task.findOneAndUpdate(
      { _id: params.id, userId: token.sub },
      { ...data, updatedAt: new Date() },
      { new: true, maxTimeMS: 5000 }
    ).lean();

    if (!task) {
      return NextResponse.json(
        { error: 'Task not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ task });
  } catch (error) {
    console.error('Error updating task:', error);
    return NextResponse.json(
      { error: 'Failed to update task', details: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const token = await getToken({ req: request });
    if (!token || !token.sub) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const task = await Task.findOneAndDelete({
      _id: params.id,
      userId: token.sub
    }).maxTimeMS(5000);

    if (!task) {
      return NextResponse.json(
        { error: 'Task not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting task:', error);
    return NextResponse.json(
      { error: 'Failed to delete task', details: error.message },
      { status: 500 }
    );
  }
}