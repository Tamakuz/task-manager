import { connectToDataBase } from "@/configs/DBconnect";
import Task from "../../../../models/task-model";
import { NextResponse } from "next/server";

/**
 * Update a task.
 *
 * @param request - The HTTP request object.
 * @param params - The parameters for the request.
 * @param params.taskId - The ID of the task to update.
 * @returns A Promise that resolves to a NextResponse object.
 * @throws {Error} If there is an error connecting to the database or updating the task.
 */
export const PUT = async (
  request: Request,
  { params }: { params: { taskId: string } }
): Promise<NextResponse> => {
  const { content } = await request.json();
  try {
    await Task.updateOne({ _id: params.taskId }, { $set: { content } });
    return NextResponse.json({ message: "Task updated successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

/**
 * Delete a task.
 *
 * @param request - The HTTP request object.
 * @param params - The parameters for the request.
 * @param params.taskId - The ID of the task to delete.
 * @returns A Promise that resolves to a NextResponse object.
 * @throws {Error} If there is an error connecting to the database or deleting the task.
 */
export const DELETE = async (
  request: Request,
  { params }: { params: { taskId: string } }
): Promise<NextResponse> => {
  try {
    await connectToDataBase();
    await Task.deleteOne({ _id: params.taskId }).lean();
    return NextResponse.json({ message: "Task deleted successfully" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
