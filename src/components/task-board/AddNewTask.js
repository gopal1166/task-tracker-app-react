import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextInput from "../../utils/text-input/TextInput";
import TextArea from "../../utils/text-area/TextArea";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addNewTask } from "../../redux-store/taskSlice";
import "./AddNewTask.scss";

const AddNewTask = () => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleTextInput = (event) => {
    setTaskTitle(event.target.value);
  };

  /**
   * To handle the text area
   * @param {*} event
   */
  const handleTextArea = (event) => {
    setTaskDescription(event.target.value);
  };

  const handleSaveBtn = () => {
    console.log("title", taskTitle);
    console.log("desc", taskDescription);
    dispatch(
      addNewTask({
        id: Math.random(),
        title: taskTitle,
        description: taskDescription,
        status: "Open",
      })
    );

    navigate(-1);
  };

  return (
    <div className="add-new-task-container">
      <h4>Add New Task</h4>
      <div>
        <TextInput
          placeholder="Enter Task Title"
          label="Task Title"
          handleTextInput={handleTextInput}
        />
      </div>

      <TextArea
        placeholder="Enter Task Description"
        label="Task Description"
        handleTextArea={handleTextArea}
      />

      <Button
        variant="contained"
        onClick={() => handleSaveBtn()}
        color="primary"
        sx={{ marginRight: "1rem" }}
      >
        Save
      </Button>
      <Button variant="outlined" onClick={() => navigate(-1)} color="primary">
        Cacel
      </Button>
    </div>
  );
};

export default AddNewTask;
