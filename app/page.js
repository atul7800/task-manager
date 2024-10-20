"use client";
import SearchBar from "@/components/SearchBar";
import Tasks from "@/components/Tasks";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "",
    completed: false,
  });

  const [editId, setEditId] = useState(null);

  const [query, setQuery] = useState("");

  const [isModalOpen, setModalOpen] = useState(false);

  // const openModal = () => setModalOpen(true);
  // const closeModal = () => setModalOpen(false);

  useEffect(() => {
    console.log(query);
  }, [query]);

  const priorities = ["low", "medium", "high"];

  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    console.log(index);
    setOpenIndex(openIndex === index ? null : index); // Toggle the index or close if it's the same
  };

  const [incompleteTasks, setIncompleteTasks] = useState([]);
  const [completeTasks, setCompleteTasks] = useState([]);

  const fetchTasks = () => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    // Separate tasks into completed and uncompleted
    const completedTasks = tasks.filter((task) => task.completed);
    const incompletedTasks = tasks.filter((task) => !task.completed);

    // Sort incomplete tasks by priority (high, medium, low)
    const sortedIncompleteTasks = incompletedTasks.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority]; // Sort descending
    });
    setIncompleteTasks(sortedIncompleteTasks);

    // Sort completed tasks by priority (high first)
    const sortedCompleteTasks = completedTasks.sort((a, b) => {
      if (a.priority === "high" && b.priority === "low") return -1;
      if (a.priority === "low" && b.priority === "high") return 1;
      return 0; // Maintain original order for same priority
    });
    setCompleteTasks(sortedCompleteTasks);
  };

  const deleteTask = (id) => {
    setOpenIndex(null);
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks = tasks.filter((task) => task.taskID !== id);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    toast.success("Task deleted successfully!");
    fetchTasks();
  };

  const editTask = (id) => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskToEdit = tasks.find((task) => task.taskID === id);

    if (taskToEdit) {
      setFormData({
        title: taskToEdit.title,
        description: taskToEdit.description,
        priority: taskToEdit.priority,
        completed: taskToEdit.completed,
      });
      setEditId(id);
    } else {
      toast.error("Task not found!");
    }
  };

  const completeTask = (id) => {
    setOpenIndex(null);
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    const updatedTasks = tasks.map((task) => {
      if (task.taskID === id) {
        return { ...task, completed: true };
      }
      return task;
    });
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    toast.success("Task completed successfully!");
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    if (editId) {
      // If in edit mode, update the existing task
      const updatedTasks = tasks.map((task) => {
        if (task.taskID === editId) {
          return {
            ...task,
            ...formData, // Update task with the new form data
          };
        }
        return task; // Return the unchanged task
      });

      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      toast.success("Task edited successfully!");
      setEditId(null);
    } else {
      const newTask = {
        taskID: Date.now(),
        ...formData,
      };
      tasks.push(newTask);
      localStorage.setItem("tasks", JSON.stringify(tasks));

      toast.success("Task added successfully!");
    }

    setFormData({
      title: "",
      description: "",
      priority: "",
      completed: false,
    });
    fetchTasks();
  };

  return (
    <>
      <ToastContainer theme="dark" />

      <form
        onSubmit={submitHandler}
        className="mx-auto mt-24 flex w-[80%] max-w-[600px] flex-col items-start gap-2 px-2"
      >
        <input
          required
          type="text"
          name="title"
          placeholder="Enter title"
          value={formData.title}
          className="w-full border-2 px-3 py-2"
          onChange={(e) => handleOnChange(e)}
        />
        <textarea
          required
          name="description"
          placeholder="Enter description"
          value={formData.description}
          className="w-full border-2 px-3 py-2"
          onChange={(e) => handleOnChange(e)}
        ></textarea>
        <select
          required
          name="priority"
          value={formData.priority}
          onChange={(e) => handleOnChange(e)}
          className="w-full border-2 px-3 py-2"
        >
          <option value="" disabled>
            Set priority
          </option>
          {priorities.map((priority, index) => (
            <option key={index} value={priority}>
              {priority}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="mt-2 rounded-lg bg-orange-600 px-11 py-3 text-white"
        >
          Save
        </button>
      </form>
      <div className="mx-auto mt-16 flex w-[80%] max-w-[600px] flex-col items-start gap-2 px-2">
        <SearchBar setQuery={setQuery} />
      </div>

      <div className="relative mx-auto mt-10 w-[60%] overflow-x-auto">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {incompleteTasks
            .filter(
              (item) =>
                item.title.toLocaleLowerCase().includes(query) ||
                item.description.toLocaleLowerCase().includes(query),
            )
            .map((item, index) => (
              <div key={item.taskID}>
                <Tasks
                  title={item.title}
                  description={item.description}
                  taskId={item.taskID}
                  completed={item.completed}
                  priority={item.priority}
                  deleteTask={deleteTask}
                  editTask={editTask}
                  completeTask={completeTask}
                  closeMenu={setOpenIndex}
                  isOpen={openIndex === index} // Check if this card's index matches the open index
                  toggleDropdown={() => handleToggle(index)} // Pass the toggle function
                />
              </div>
            ))}
        </div>
        <div className="flex w-full items-center justify-center py-5">
          <span className="my-5 w-full border-b-2"></span>
          <p className="whitespace-nowrap px-2 py-1 text-lg font-bold">
            Completed tasks
          </p>
          <span className="my-5 w-full border-b-2"></span>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {completeTasks.map((item, index) => (
            <div key={item.taskID}>
              <Tasks
                title={item.title}
                description={item.description}
                taskId={item.taskID}
                completed={item.completed}
                priority={item.priority}
                deleteTask={deleteTask}
                completeTask={completeTask}
                closeMenu={setOpenIndex}
                isOpen={openIndex === index} // Check if this card's index matches the open index
                toggleDropdown={() => handleToggle(index)} // Pass the toggle function
              />
            </div>
          ))}
        </div>
      </div>
      {/* <TaskDescriptionModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="My Modal"
      >
        
      </TaskDescriptionModal> */}
    </>
  );
}
