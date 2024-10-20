import React from "react";
import KebabMenu from "./KebabMenu";

const Tasks = ({
  title,
  description,
  taskId,
  deleteTask,
  completed,
  priority,
  completeTask,
  isOpen,
  toggleDropdown,
  closeMenu,
}) => {
  const bgColor =
    priority === "low"
      ? "bg-yellow-200"
      : priority === "medium"
        ? "bg-orange-300"
        : "bg-red-400";
  return (
    <div
      className={`rounded-lg border-2 border-teal-600 px-3 py-1 ${bgColor} ${completed && "bg-green-300"}`}
    >
      <div className="flex items-center justify-between gap-1 border-b-2">
        <h2 className={`text-lg font-bold ${completed && "line-through"}`}>
          {title}
        </h2>

        <KebabMenu
          isOpen={isOpen}
          toggleDropdown={toggleDropdown}
          onDone={() => completeTask(taskId)}
          onDelete={() => deleteTask(taskId)}
        />
      </div>

      <p className={`mt-2 ${completed && "line-through"}`}>{description}</p>
    </div>
  );
};

export default Tasks;
