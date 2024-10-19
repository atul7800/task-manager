"use client";
import Tasks from "@/components/Tasks";
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "",
  });

  const priorities = ["low", "high"];

  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index); // Toggle the index or close if it's the same
  };

  const [taskData, setTaskData] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await axios("/api");
      setTaskData(response.data.tasks);
    } catch (error) {
      toast.error("Couldn't Load the tasks");
    }
  };

  const deleteTask = async (id) => {
    setOpenIndex(null);
    const response = await axios.delete("/api", {
      params: {
        mongoId: id,
      },
    });

    toast.success(response.data.msg);
    fetchTasks();
  };

  const completeTask = async (id) => {
    setOpenIndex(null);
    const response = await axios.put(
      "/api",
      {},
      {
        params: {
          mongoId: id,
        },
      },
    );
    toast.success(response.data.msg);
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

  const submitHandler = async (e) => {
    e.preventDefault();

    //api call
    try {
      const response = await axios.post("/api", formData);

      toast.success(response.data.msg);
      setFormData({
        title: "",
        description: "",
        priority: "",
      });
      fetchTasks();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <ToastContainer theme="dark" />
      <form
        onSubmit={submitHandler}
        className="mx-auto mt-24 flex w-[80%] max-w-[600px] flex-col items-start gap-2 px-2"
      >
        <input
          type="text"
          name="title"
          placeholder="Enter title"
          value={formData.title}
          className="w-full border-2 px-3 py-2"
          onChange={(e) => handleOnChange(e)}
        />
        <textarea
          name="description"
          placeholder="Enter description"
          value={formData.description}
          className="w-full border-2 px-3 py-2"
          onChange={(e) => handleOnChange(e)}
        ></textarea>
        <select
          name="category"
          value={formData.priority}
          onChange={(e) => handleOnChange(e)}
          className="w-full border-2 px-3 py-2"
        >
          <option value="" disabled>
            Select priority
          </option>
          {priorities.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <button type="submit" className="bg-orange-600 px-11 py-3 text-white">
          Save
        </button>
      </form>

      <div className="relative mx-auto mt-24 w-[60%] overflow-x-auto">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {taskData.map((item, index) => (
            <div key={index}>
              <Tasks
                key={index}
                title={item.title}
                description={item.description}
                complete={item.isCompleted}
                mongoId={item._id}
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
    </>
  );
}
