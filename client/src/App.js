import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const currentUser = true;
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/posts" element={<Home />}></Route>
        <Route
          path="/register"
          element={<Register />}
        ></Route>
        <Route
          path="/login"
          element={currentUser ? <Home /> : <Login />}
        ></Route>
        <Route path="/post/:id" element={<Single />}></Route>
        <Route
          path="/write"
          element={currentUser ? <Write /> : <Login />}
        ></Route>
        <Route
          path="/settings"
          element={currentUser ? <Settings /> : <Login />}
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
