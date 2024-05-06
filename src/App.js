import logo from "./logo.svg";
import "./App.css";
import HelloWorld from "./HelloWorld";
import Navbar from "./components/navbar/Navbar";
import TaskBoard from "./components/task-board/TaskBoard";
import Routes from "./components/Routes";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes />
    </div>
  );
}

export default App;
