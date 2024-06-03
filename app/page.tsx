"use client";

import AddTask from "@/components/add-task";
import DeleteTask from "@/components/delete-task";
import PutTask from "@/components/put-task";
import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

interface Task {
  _id: number;
  content: string;
}

export default function Home() {
  const { data: tasksData, isLoading } = useSWR<{ tasks: Task[] }>("/api/task", fetcher);
  const tasks = tasksData?.tasks ?? [];

  return (
    <main className="home">
      <h1 className="title">Simple CRUD Task Manager</h1>
      <AddTask />

      <div className="task-list">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          tasks.map(({ _id: taskId, content }) => (
            <div className="task-card" key={taskId}>
              <p>{content}</p>
              <div>
                <PutTask id={taskId} content={content} />
                <DeleteTask id={taskId} />
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
