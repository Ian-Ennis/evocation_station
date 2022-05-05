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

  console.log('App')

  // useEffect(() => {
  //   console.log('in App useEffect')
  //   fetch("http://localhost:3000/me")
  //     .then((response) => {
  //       if (response.ok) {
  //         console.log("Status Text:", response.status)
  //         response.json().then(data => {
  //           setCurrentUser(data)
  //           navigate("/home");
  //         })
  //       }
  //     })
  // }, []);

  return (
    <div>
      <h1>Evocation Station</h1>
      <Routes>
          <Route path="/" element={<SignUpForm setIsAuthenticated={setIsAuthenticated} setCurrentUser={setCurrentUser}/>} />
          <Route path="/login" element={<LoginForm setIsAuthenticated={setIsAuthenticated} setCurrentUser={setCurrentUser} currentUser={currentUser}/>} />
          <Route path="/home" element={<LoggedIn setCurrentUser={setCurrentUser} currentUser={currentUser}/>} />
      </Routes>
    </div>
  );
};

export default App;
