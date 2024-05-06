import React from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import TextInput from "../../utils/text-input/TextInput";
import TextArea from "../../utils/text-area/TextArea";
import "./EditTask.scss";

const EditTask = (props) => {
  return (
    <div>
      <Drawer
        open={props.showEditTask}
        onClose={() => props.closeDrawer()}
        PaperProps={{ sx: { width: 400, padding: "1rem" } }}
      >
        <h3>Edit Task</h3>
        <TextInput label="Task Title" />
        <TextArea label="Task Desc" />

        <div>
          <Button variant="contained" sx={{ marginRight: ".5rem" }}>
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
