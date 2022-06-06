import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm({ setCurrentUser, setSignedIn }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')  
  const [noAccount, setNoAccount] = useState(false)

  const navigate = useNavigate();

  function handleSubmit(e){
    e.preventDefault()
    const user = {
        username: username,
        password
    }
   
    fetch(`http://localhost:3000/login`,{
      method:'POST',
      headers:{'Content-Type': 'application/json'},
      body:JSON.stringify(user)
    })
    .then(response => {
      if(response.ok){
        response.json()
        .then(user=>{
          setCurrentUser(user)
          // setIsAuthenticated(true)
          setNoAccount(false)
          setSignedIn(true)
          setUsername("")
          setPassword("")
          navigate("/home");
        })
        
      } else {
        setNoAccount(true);
        throw Error(response.status, response.statusText);
      }
    })
}


  // function handleSubmit(e) {
  //   e.preventDefault();
  //   const userCreds = { ...formData };

  //   fetch("http://localhost:3000/login", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(userCreds),
  //   }).then((response) => {
  //     if (response.ok) {
  //       response.json()
  //       .then((user) => {
  //         setCurrentUser(user)
  //         localStorage.setItem('user', JSON.stringify(user))
  //         // console.log("stringified user:", localStorage.getItem('user'))
  //         setNoAccount(false);
  //         setSignedIn(true)
  //         setFormData({
  //           username: "",
  //           password: "",
  //         });
  //         navigate("/home");
  //       });
  //     } else {
  //       setNoAccount(true);
  //       throw Error(response.status, response.statusText);
  //     }
  //   });
  // }

  function userNeedsAccount(e) {
    e.preventDefault();
    navigate("/")
    }

  return (
    <>
      <h1>Login here!</h1>


      <form onSubmit={handleSubmit}>
        <label>
          Username
   
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
         Password
    
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
       
        <input type="submit" value="Login!" />
      </form>



      <button onClick={userNeedsAccount}>Create an account</button>
      {noAccount ? <div><em>Error: Please double-check your username and/or password.</em></div> : null}
    </>
  );
};

export default LoginForm;
