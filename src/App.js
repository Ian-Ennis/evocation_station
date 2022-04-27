import { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import LoggedIn from "./Components/LoggedIn";
import LoggedOut from "./Components/LoggedOut";
import SignupForm from "./Components/SignUpForm";
import LoginForm from "./Components/LoginForm";
import "./App.css";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // When a user first lands on the app, a fetch request will be made
  // to check if user has already been authenticated.

  useEffect(() => {
    fetch("http://localhost:3000/me").then((res) => {
      if (res.ok) {
        console.log("response okay");
        res.json().then((user) => {
          setCurrentUser(user);
          setIsAuthenticated(true);
          console.log("user exists and is authenticated");
        });
      }
    });
  }, []);

  // If client is not authenticated, the authentication process will begin
  // by rendering either a login or signup form.
  if (!isAuthenticated) {
    return (
      <SignupForm />
    );
  }

  return (
    <div>
      <h1>Evocation Station</h1>
      <Router>
        {currentUser ? (
          <LoggedIn setCurrentUser={setCurrentUser} currentUser={currentUser} />
        ) : (
          <LoggedOut
            setCurrentUser={setCurrentUser}
          />
        )}
      </Router>
    </div>
  );
};

export default App;
