import React from "react";

const Tasks = ({
  id,
  title,
  description,
  complete,
  mongoId,
  deleteTask,
  completeTask,
}) => {
  return (
    <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
      <th
        scope="row"
        className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
      >
        {id + 1}
      </th>
      <td className={`px-6 py-4 ${complete ? "line-through" : ""}`}>{title}</td>
      <td className={`px-6 py-4 ${complete ? "line-through" : ""}`}>
        {description}
      </td>
      <td className="px-6 py-4">{complete ? "Completed" : "Pending"}</td>
      <td className="px-6 py-4">
        <div className="flex gap-2">
          <button
            onClick={() => deleteTask(mongoId)}
            className="w-20 bg-red-500 px-4 py-2 text-white"
          >
            Delete
          </button>
          {complete ? (
            ""
          ) : (
            <button
              onClick={() => completeTask(mongoId)}
              className="w-20 bg-green-500 px-4 py-2 text-white"
            >
              Done
            </button>
          )}
        </div>
      </td>
    </tr>
  );
};

export default Tasks;
