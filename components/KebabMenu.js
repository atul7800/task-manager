import React from "react";

const KebabMenu = ({ isOpen, toggleDropdown, onDelete, onDone }) => {
  return (
    <div className="menu-container relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="inline-flex h-full w-full items-center justify-center rounded-md text-lg font-medium text-gray-700 hover:bg-gray-200 focus:outline-none"
      >
        ⋮
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {/* <button
              onClick={onEdit}
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
            >
              Edit
            </button> */}
            <button
              onClick={onDelete}
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
            >
              Delete
            </button>
            <button
              onClick={onDone}
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default KebabMenu;
