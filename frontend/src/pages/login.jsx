import { useState } from "react";
import api from '../api/axios';


export default function Login(){

    const [username, setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [email,setEmail] = useState("");
    const [error,setError] = useState("");


    async function  handleLogin(e){
        e.preventDefault();// prevent the default form submission behavior, which would cause a page reload.
        
       try{

         const response = await api.post('/auth/login', {username,password});


        localStorage.setItem('token',response.data.access_token); // store the JWT token in localStorage. This allows us to persist the user's login state across page refreshes and browser sessions.
        
        localStorage.setItem('user',JSON.stringify(response.data.user)); //saves the user object too. Useful for showing the username in the navbar. JSON.stringify converts the object to a string because localStorage only stores strings.

        window.location.href('/books'); // redirect to the books page after successful login. This is a simple way to navigate, but in a real app, you'd likely use React Router for better navigation handling.
       } 
       catch(error){
        setError(error.response?.data?.meassage || "Login failed "); // set an error message if the login fails. This will display feedback to the user if their credentials are incorrect or if there's a server issue.
       }

        
    }

    return(
         <div>
      <h2>Login</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>

      <p>
        Don't have an account? <a href="/register">Register</a>
      </p>
    </div>
    );
}