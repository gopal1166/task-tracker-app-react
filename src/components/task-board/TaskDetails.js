import React, { useEffect, useState } from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextInput from "../../utils/text-input/TextInput";
import TextArea from "../../utils/text-area/TextArea";
import "./EditTask.scss";

const statusOptions = [
  { label: "Open", value: "Open" },
  { label: "In Progress", value: "InProgress" },
  { label: "In Verification", value: "InVerification" },
  { label: "Done", value: "Done" },
];

const TaskDetails = (props) => {
  const [taskTitle, setTaskTitle] = useState(props.taskToEdit?.title);
  const [taskDesc, setTaskDesc] = useState(props.taskToEdit?.description);
  const [status, setStatus] = useState(props.taskToEdit?.status);

  useEffect(() => {
    if (props) {
      console.log("props: ", props);
      setTaskTitle(props.taskToEdit?.title);
      setTaskDesc(props.taskToEdit?.description);
      setStatus(props.taskToEdit?.status);
    }
  }, [props]);

  const statusHandler = (event) => {
    console.log("value", event.target.value);
    setStatus(event.target.value);
  };

  const titleHander = (event) => {
    setTaskTitle(event.target.value);
  };

  const descHandler = (event) => {
    setTaskDesc(event.target.value);
  };

  const updateBtnHandler = () => {
    console.log("title", taskTitle);
    console.log("desc", taskDesc);
    console.log("status", status);
    console.log("props", props);
    props.updateTask({
      title: taskTitle,
      description: taskDesc,
      status: status,
    });
  };

  return (
    <div>
      <Drawer
        anchor="right"
        open={props.showTaskDetails}
        onClose={() => props.closeDrawer()}
        PaperProps={{
          sx: { width: 400, padding: "1rem", backgroundColor: "#9DAAF2" },
        }}
      >
        <h3>Task Details</h3>

        <h4>Title</h4>
        <p>{props.taskDetails?.title}</p>
        <h4>Description</h4>
        <p>{props.taskDetails?.description}</p>
        <h4>Staus</h4>
        <p>{props.taskDetails?.status}</p>
      </Drawer>
    </div>
  );
};

export default TaskDetails;
