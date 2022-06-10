import { BrowserRouter, Routes ,Route } from "react-router-dom";
import Login from "./components/Login";
import './App.css';
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/dashboard/:username" element={<><Navbar/><Dashboard/></>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
