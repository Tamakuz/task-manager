"use client";
import React, { useState } from "react";
import { mutate } from "swr";
import Notification from "../components/notification";

interface DeleteTaskProps {
  id: number;
}

const DeleteTask: React.FC<DeleteTaskProps> = ({ id }: DeleteTaskProps): JSX.Element => {
  const [notification, setNotification] = useState<boolean | null>(null);

  /**
   * Handles the removal of a task.
   */
  const handleRemoveTask = async (): Promise<void> => {
    try {
      await fetch(`/api/task/${id}`, {
        method: "DELETE",
      });
      mutate("/api/task");
      setNotification(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button className="remove-task-btn" onClick={handleRemoveTask}>
        Remove
      </button>
      {notification && (
        <Notification
          message="Task successfully removed!"
          type="delete"
          onClose={() => setNotification(null)}
        />
      )}
    </>
  );
};

DeleteTask.displayName = "DeleteTask";

export default DeleteTask;
