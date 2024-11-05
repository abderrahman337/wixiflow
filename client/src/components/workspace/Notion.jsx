import React, { useState } from "react";
import axios from "axios";

const TaskForm = () => {
  const [taskData, setTaskData] = useState({
    title: "",
    dueDate: "",
    assignees: [],
  });

  const handleInputChange = (e) => {
    setTaskData({
      ...taskData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send task data to backend to create task in Notion
    try {
      const response = await axios.post(
        `${process.env.VITE_BACKEND_URL}/api/notion/create-task`,
        taskData
      );
      console.log("Task created:", response.data);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const handleNotionClick = () => {
    // Redirect to OAuth login page for Notion
    window.location.href = `/auth/notion`;
  };

  return (
    <div>
      <h1>Create a Task in Notion</h1>
      <button onClick={handleNotionClick}>Login with Notion</button>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Task Title"
          value={taskData.title}
          onChange={handleInputChange}
        />
        <input
          type="date"
          name="dueDate"
          value={taskData.dueDate}
          onChange={handleInputChange}
        />
        <button type="submit">Create Task</button>
      </form>
    </div>
  );
};

export default TaskForm;
