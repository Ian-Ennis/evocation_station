import { useState, useEffect} from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import SignUpForm from "./Components/SignUpForm";
import LoginForm from "./Components/LoginForm";
import LoggedIn from "./Components/LoggedIn";
import "./App.css";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  console.log('in app')
  console.log(currentUser)

  useEffect(() => {
    fetch("http://localhost:3000/me")
      .then((r) => r.json())
      .then((data) => console.log(data));
  });

  return (
    <div>
      <h1>Evocation Station</h1>
      <Routes>
          <Route path="/" element={<SignUpForm setIsAuthenticated={setIsAuthenticated} setCurrentUser={setCurrentUser}/>} />
          <Route path="/login" element={<LoginForm setIsAuthenticated={setIsAuthenticated} setCurrentUser={setCurrentUser}/>} />
          <Route path="/home" element={<LoggedIn setCurrentUser={setCurrentUser} currentUser={currentUser}/>} />
      </Routes>
    </div>
  );
};

export default App;
