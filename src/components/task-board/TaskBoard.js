import React, { useEffect, useState } from "react";
import "./TaskBoard.scss";
import { Button } from "@mui/material";
import Alert from "@mui/material/Alert";
import Drawer from "@mui/material/Drawer";
import CircularProgress from "@mui/material/CircularProgress";
import TaskCard from "../../utils/task-card/TaskCard";
import { useSelector } from "react-redux";
import useFetchPosts from "../../hooks/useFetchPosts";
import { useNavigate } from "react-router-dom";
import EditTask from "./EditTask";
import TaskDetails from "./TaskDetails";

const TaskBoard = () => {
  const { data: storeData } = useSelector((state) => state.taskSlice);
  const { loading, error, data } = useFetchPosts();
  const [openTaskList, setOpenTaskList] = useState([]);
  const [inProgressTaskList, setInProgressTaskList] = useState([]);
  const [inVerificationTaskList, setInVerificationTaskList] = useState([]);
  const [doneTaskList, setDoneTaskList] = useState([]);
  const [taskList, setTaskList] = useState([]);
  const [showEditTask, setShowEditTask] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState();
  const [taskDetails, setTaskDetails] = useState();
  const [showTaskDetails, setShowTaskDetails] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setTaskList([...data, ...storeData]);
    }
  }, [data, storeData]);

  const handleDelete = (id) => {
    setTaskList(taskList.filter((task) => task.id !== id));
  };

  useEffect(() => {
    if (taskList) {
      setOpenTaskList(taskList.filter((task) => task.status === "Open"));
      setInProgressTaskList(
        taskList.filter((task) => task.status === "InProgress")
      );
      setInVerificationTaskList(
        taskList.filter((task) => task.status === "InVerification")
      );
      setDoneTaskList(taskList.filter((task) => task.status === "Done"));
    }
  }, [taskList]);

  const closeDrawer = () => {
    setShowEditTask(false);
    setShowTaskDetails(false);
  };

  const handlePreviewIcon = (task) => {
    console.log("task", task);
    setTaskDetails(task);
    setShowTaskDetails(true);
  };

  const handleEditIcon = (taskObj) => {
    console.log("taskObj,", taskObj);
    setTaskToEdit(taskObj);
    setShowEditTask(true);
  };

  const updateTask = (updateObj) => {
    console.log("updatedObj,", updateObj);
    console.log("tasktoedit", taskToEdit.id);
    const updatedItems = taskList.map((obj) =>
      obj.id === taskToEdit.id ? { ...updateObj, id: taskToEdit.id } : obj
    );

    console.log("updatedItems, ", updatedItems);
    setTaskList(updatedItems);
    setShowEditTask(false);
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <div className="taskboard-container">
      <div className="title-conatainer">
        <div>
          <h3>Task Board</h3>
        </div>
        <div className="add-task-btn">
          <Button
            variant="outlined"
            onClick={() => {
              navigate("/add-new-task");
            }}
          >
            Add Task
          </Button>
        </div>
      </div>

      {/* Task Stages */}
      <div className="task-stage-flex-container">
        <div className="task-stage-flex-item">
          <h5>OPEN</h5>
          {openTaskList &&
            openTaskList.map((task) => {
              return (
                <TaskCard
                  handleDelete={handleDelete}
                  id={task.id}
                  title={task.title}
                  description={task.description}
                  status={task.status}
                  closeDrawer={closeDrawer}
                  handleEditIcon={handleEditIcon}
                  handlePreviewIcon={handlePreviewIcon}
                />
              );
            })}
          {/* <TaskCard
            title="Task One Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit."
            description="This is test description Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amLorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amLorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit am"
          /> */}
        </div>
        <div className="task-stage-flex-item">
          <h5>IN PROGRESS</h5>
          {inProgressTaskList &&
            inProgressTaskList.map((task) => {
              return (
                <TaskCard
                  handleDelete={handleDelete}
                  id={task.id}
                  title={task.title}
                  description={task.description}
                  status={task.status}
                  closeDrawer={closeDrawer}
                  handleEditIcon={handleEditIcon}
                  handlePreviewIcon={handlePreviewIcon}
                />
              );
            })}
        </div>
        <div className="task-stage-flex-item">
          <h5>IN VERIFICATION</h5>
          {inVerificationTaskList &&
            inVerificationTaskList.map((task) => {
              return (
                <TaskCard
                  handleDelete={handleDelete}
                  id={task.id}
                  title={task.title}
                  description={task.description}
                  status={task.status}
                  closeDrawer={closeDrawer}
                  handleEditIcon={handleEditIcon}
                  handlePreviewIcon={handlePreviewIcon}
                />
              );
            })}
        </div>
        <div className="task-stage-flex-item">
          <h5>DONE</h5>
          {doneTaskList &&
            doneTaskList.map((task) => {
              return (
                <TaskCard
                  handleDelete={handleDelete}
                  id={task.id}
                  title={task.title}
                  description={task.description}
                  status={task.status}
                  closeDrawer={closeDrawer}
                  handleEditIcon={handleEditIcon}
                  handlePreviewIcon={handlePreviewIcon}
                />
              );
            })}
        </div>
      </div>

      <EditTask
        showEditTask={showEditTask}
        closeDrawer={closeDrawer}
        updateTask={updateTask}
        taskToEdit={taskToEdit}
      />

      <TaskDetails
        showTaskDetails={showTaskDetails}
        taskDetails={taskDetails}
        closeDrawer={closeDrawer}
      />
    </div>
  );
};

export default TaskBoard;
