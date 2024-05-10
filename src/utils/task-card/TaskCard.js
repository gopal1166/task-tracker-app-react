import React, { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import AlarmIcon from "@mui/icons-material/Alarm";
import Drawer from "@mui/material/Drawer";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import PreviewIcon from "@mui/icons-material/Preview";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import "./TaskCard.scss";

const TaskCard = (props) => {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const { id, title, description, status } = props;

  useEffect(() => {
    console.log("status", status);
  }, []);

  return (
    <div className="task-card-container">
      <div className="task-title-flex-container">
        <h5 className="task-title">{props.title}</h5>
        <IconButton aria-label="view">
          <PreviewIcon
            fontSize="small"
            onClick={() => {
              props.handlePreviewIcon({ ...props });
            }}
          />
        </IconButton>
        <IconButton aria-label="edit">
          <BorderColorIcon
            fontSize="small"
            onClick={() => {
              console.log("props", props);
              props.handleEditIcon({ ...props });
            }}
          />
        </IconButton>
        <IconButton aria-label="delete">
          <DeleteIcon
            fontSize="small"
            color="error"
            onClick={() => {
              setShowConfirmDelete(true);
            }}
          />
        </IconButton>
      </div>
      <p className="task-description">{props.description}</p>

      {showConfirmDelete && (
        <Dialog
          open={() => {}}
          onClose={() => {}}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Confirm delete?</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete the task?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setShowConfirmDelete(false);
              }}
            >
              cancel
            </Button>
            <Button
              onClick={() => {
                props.handleDelete(props.id);
                setShowConfirmDelete(false);
              }}
              variant="outlined"
              color="error"
            >
              Confirm Delete
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default TaskCard;
