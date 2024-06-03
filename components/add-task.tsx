"use client";
import React from "react";
import { mutate } from "swr";
import Notification from "../components/notification";

const AddTask: React.FC = (): JSX.Element => {
  const [modalIsOpen, setModalIsOpen] = React.useState<boolean>(false);
  const [task, setTask] = React.useState<string>("");
  const [notification, setNotification] = React.useState<boolean | null>(null);

  /**
   * Open the modal
   */
  const openModal = (): void => setModalIsOpen(true);

  /**
   * Close the modal
   */
  const closeModal = (): void => setModalIsOpen(false);

  /**
   * Handle the task addition
   */
  const handleAddTask = React.useCallback(async (): Promise<void> => {
    try {
      await fetch("/api/task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: task }),
      });
      mutate("/api/task");
      setNotification(true);
    } catch (error) {
      console.error(error);
    } finally {
      setTask("");
      closeModal();
    }
  }, [task, closeModal, mutate]);

  /**
   * Handle the task change
   */
  const handleTaskChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setTask(e.target.value);
  };

  return (
    <>
      <button className="add-task-btn" onClick={openModal}>
        Add Task
      </button>
      {modalIsOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Add a New Task</h2>
            <textarea
              onChange={handleTaskChange}
              value={task}
              className="task-textarea"
            />
            <button className="add-task-now-btn" onClick={handleAddTask}>
              Add Task Now
            </button>
            <button className="close-modal-btn" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
      {notification && (
        <Notification
          message="Task successfully added!"
          type="add"
          onClose={(): void => setNotification(null)}
        />
      )}
    </>
  );
};

AddTask.displayName = "AddTask";

export default AddTask;
