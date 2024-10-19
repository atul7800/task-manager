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
  });

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
    const response = await axios.delete("/api", {
      params: {
        mongoId: id,
      },
    });

    toast.success(response.data.msg);
    fetchTasks();
  };

  const completeTask = async (id) => {
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
    console.log(formData);
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
        <button type="submit" className="bg-orange-600 px-11 py-3 text-white">
          Save
        </button>
      </form>

      <div className="relative mx-auto mt-24 w-[60%] overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Id
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {taskData.map((item, index) => {
              return (
                <Tasks
                  key={index}
                  id={index}
                  title={item.title}
                  description={item.description}
                  complete={item.isCompleted}
                  mongoId={item._id}
                  deleteTask={deleteTask}
                  completeTask={completeTask}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
