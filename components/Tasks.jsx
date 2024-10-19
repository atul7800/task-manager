import React from "react";
import KebabMenu from "./KebabMenu";

const Tasks = ({
  title,
  description,
  mongoId,
  deleteTask,
  completeTask,
  isOpen,
  toggleDropdown,
  closeMenu,
}) => {
  return (
    <div className="rounded-lg border-2 border-teal-600 p-3">
      <div className="flex items-center justify-between gap-1 border-b-2">
        <h2 className="text-lg font-bold">{title}</h2>

        <KebabMenu
          isOpen={isOpen}
          toggleDropdown={toggleDropdown}
          onDone={() => completeTask(mongoId)}
          onDelete={() => deleteTask(mongoId)}
        />
      </div>

      <p className="mt-2">{description}</p>
    </div>
  );
};

export default Tasks;
