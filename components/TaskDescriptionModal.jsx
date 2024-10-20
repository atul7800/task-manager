import React from "react";

const TaskDescriptionModal = () => {
  if (!isOpen) return null; // Don't render if the modal is not open

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-sm rounded-lg bg-white p-5 shadow-lg">
        <h2 className="text-xl font-semibold">{title}</h2>
        <div className="mt-4">{children}</div>
        <button
          onClick={onClose}
          className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default TaskDescriptionModal;
