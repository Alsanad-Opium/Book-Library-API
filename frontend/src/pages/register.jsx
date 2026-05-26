import { useState } from "react";
import api from '../api/axios';


export default function Register(){

    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [email,setEmail] = useState('');
    const [success,setSuccess] = useState('');
    const [error,setError] = useState('');

    async function handleRegister(e){

        e.preventDefault();

        try{
            const response = await api.post('/auth/register', {username, password,email});
            setSuccess("Account created successfully")
            setError('')

           setTimeout(() => {
                 window.location.href('/login');
           }, 3000); // will direct to login page after 3 seconds
            // set a success message if registration is successful. This will provide feedback to the user that their account was created successfully.
        } catch (error) {
            setError("Failed to create account")
        }

    }

    return(<div>
      <h2>Register</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

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

      <button onClick={handleRegister}>Register</button>

      <p>
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
    );
}