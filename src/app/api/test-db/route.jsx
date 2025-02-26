import connectDB from "@/lib/db";

export async function GET() {
  try {
    await connectDB();
    return Response.json({ message: 'Successfully connected to MongoDB!' });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    return Response.json(
      { message: 'Failed to connect to MongoDB', error: error.message },
      { status: 500 }
    );
  }
}