import { connectToDataBase } from "@/configs/DBconnect";
import Task from "../../../models/task-model";
import { NextResponse } from "next/server";

/**
 * Get all tasks.
 *
 * @returns A Promise that resolves to a NextResponse object containing an array of TaskType objects.
 * @throws {Error} If there is an error connecting to the database or fetching the tasks.
 */
export const GET = async (): Promise<NextResponse> => {
  try {
    await connectToDataBase();
    const tasks = await Task.find({}, { content: 1, _id: 1 }).lean();

    return NextResponse.json({ tasks }, { status: tasks.length ? 200 : 404 });
  } catch {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

/**
 * Create a new task.
 *
 * @param request - The HTTP request object.
 * @returns A Promise that resolves to a NextResponse object.
 * @throws {Error} If there is an error connecting to the database or saving the task.
 */
export const POST = async (request: Request): Promise<NextResponse> => {
  try {
    await connectToDataBase();
    const { content } = await request.json();

    await Task.create({ content });

    return NextResponse.json({ message: 'Task created successfully' }, { status: 201 });
  } catch {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
