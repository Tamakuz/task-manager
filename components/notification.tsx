"use client"
import React, { useEffect } from "react";

interface NotificationProps {
  message: string;
  type: "add" | "update" | "delete";
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ 
  message, 
  type, 
  onClose 
}: NotificationProps): JSX.Element => {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  /**
   * Gets the background color of the notification based on the type.
   * @returns {string} The background color of the notification.
   */
  const getBackgroundColor = (): string => {
    switch (type) {
      case "add":
        return "#4caf50"; // Green
      case "update":
        return "#ff9800"; // Orange
      case "delete":
        return "#f44336"; // Red
      default:
        return "#2196f3"; // Blue
    }
  };

  return (
    <div
      className="notification"
      style={{ backgroundColor: getBackgroundColor() }}
    >
      {message}
    </div>
  );
};

Notification.displayName = "Notification";

export default Notification;
