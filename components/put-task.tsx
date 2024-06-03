"use client";
import React, { ChangeEvent, useState } from "react";
import { mutate } from "swr";
import Notification from "../components/notification";

type PutTaskParams = {
  id: number;
  content: string;
};

const PutTask = ({ id, content }: PutTaskParams): JSX.Element => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [task, setTask] = useState<string>(content);
  const [notification, setNotification] = useState<boolean | null>(null);

  /**
   * Open the modal.
   */
  const openModal = (): void => {
    setModalIsOpen(true);
  };

  /**
   * Close the modal.
   */
  const closeModal = (): void => {
    setModalIsOpen(false);
  };

  /**
   * Handle the task editing.
   */
  const handlePutTask = async (): Promise<void> => {
    try {
      const response = await fetch(`/api/task/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: task }),
      });
      await response.json();
      mutate("/api/task");
      setNotification(true);
    } catch (error) {
      console.log(error);
    } finally {
      setTask(content);
      closeModal();
    }
  };

  /**
   * Handle the task change.
   */
  const handleTaskChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setTask(event.target.value);
  };

  return (
    <>
      <button className="edit-task-btn" onClick={openModal}>
        Edit
      </button>
      {modalIsOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Edit Task</h2>
            <textarea
              onChange={handleTaskChange}
              value={task}
              className="task-textarea"
            />
            <button className="add-task-now-btn" onClick={handlePutTask}>
              Edit Task Now
            </button>
            <button className="close-modal-btn" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
      {notification && (
        <Notification
          message="Task successfully Edited"
          type="update"
          onClose={() => setNotification(null)}
        />
      )}
    </>
  );
};

PutTask.displayName = "PutTask";

export default PutTask;
