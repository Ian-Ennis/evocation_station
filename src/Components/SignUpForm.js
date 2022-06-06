import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignupForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [accountExists, setAccountExists] = useState(false)

  const navigate = useNavigate();

  function handleSubmit(e){
    e.preventDefault()
    const user = {
        username: username,
        password
    }
   
    fetch(`http://localhost:3000/users`,{
      method:'POST',
      headers:{'Content-Type': 'application/json'},
      body:JSON.stringify(user)
    })
    .then(response => {
      if(response.ok){
        response.json()
        .then(user=>{
          console.log("response is okay, here's the user:", user);
          // setIsAuthenticated(true)
          setAccountExists(false)
          setUsername("")
          setPassword("")
          navigate("/login");
        })

      } else {
        response.json()
        setAccountExists(true)
        throw Error(response.status, response.statusText)
      }
    })
}


  // function handleSubmit(e) {
  //   e.preventDefault();

  //   const userCreds = { ...formData };
  //   fetch("http://localhost:3000/users", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(userCreds),
  //   }).then((response) => {
  //     if (response.ok) {
  //       response.json()
  //       .then((user) => {
  //         console.log("response is okay, here's the user:", user);
  //         setAccountExists(false)
  //         setFormData({
  //           username: "",
  //           password: "",
  //         });
  //         navigate("/login");
  //       });
  //     } else {response.json()
  //       setAccountExists(true)
  //       throw Error(response.status, response.statusText)
  //     }
  //   });
  // }

  function userHasAccount(e) {
    e.preventDefault();
    navigate("/login")
  }

  return (
    <>
      <h1>Sign up here!</h1>


      <form onSubmit={handleSubmit}>
        <label>
          Username
   
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        
        <label>
         Password
    
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
       
        <input type="submit" value="Sign up!" />
      </form>


  
      <button onClick={userHasAccount}>Have an account?</button>
      {accountExists ? <div>An account already exists with this username/password. Please log in.</div> : null}
    </>
  );
}

export default SignupForm;
