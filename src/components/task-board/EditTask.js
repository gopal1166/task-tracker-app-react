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

const EditTask = (props) => {
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
        open={props.showEditTask}
        onClose={() => props.closeDrawer()}
        PaperProps={{
          sx: { width: 400, padding: "1rem", backgroundColor: "#9DAAF2" },
        }}
      >
        <h3>Edit Task</h3>
        <TextInput
          label="Task Title"
          handleTextInput={titleHander}
          defaultValue={props.taskToEdit?.title}
        />
        <TextArea
          label="Task Desc"
          handleTextArea={descHandler}
          defaultValue={props.taskToEdit?.description}
        />

        <Box sx={{ minWidth: 120, width: "90%", marginBottom: "1rem" }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={status}
              defaultValue={status ? status : "Open"}
              label="Status"
              onChange={statusHandler}
            >
              {statusOptions.map((option) => {
                return <MenuItem value={option.value}>{option.label}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </Box>

        <div>
          <Button
            variant="contained"
            sx={{ marginRight: ".5rem" }}
            onClick={updateBtnHandler}
          >
            Update
          </Button>
          <Button variant="outlined" onClick={() => props.closeDrawer()}>
            Cancel
          </Button>
        </div>
      </Drawer>
    </div>
  );
};

export default EditTask;
