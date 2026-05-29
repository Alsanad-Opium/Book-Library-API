import { useState } from "react";
import api from '../api/axios';


export default function Login(){

    const [username, setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [email,setEmail] = useState("");
    const [error,setError] = useState("");
    const [loading, setLoading] = useState(false);


    async function  handleLogin(e){
        e.preventDefault();// prevent the default form submission behavior, which would cause a page reload.
        setLoading(true);
        setError("");
       try{

         const response = await api.post('/auth/login', {email,password});


        localStorage.setItem('token',response.data.access_token); // store the JWT token in localStorage. This allows us to persist the user's login state across page refreshes and browser sessions.
        
        localStorage.setItem('user',JSON.stringify(response.data.user)); //saves the user object too. Useful for showing the username in the navbar. JSON.stringify converts the object to a string because localStorage only stores strings.

        window.location.replace('/books'); // redirect to the books page after successful login. This is a simple way to navigate, but in a real app, you'd likely use React Router for better navigation handling.
       } 
       catch(error){
        setError(error.response?.data?.meassage || "Login failed "); // set an error message if the login fails. This will display feedback to the user if their credentials are incorrect or if there's a server issue.
       } finally{
         setLoading(false);
       }

        
    }

    return(
         <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="flex items-center gap-2 justify-center mb-8">
          <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-bold">BL</span>
          </div>
          <span className="text-white text-xl font-semibold">Book Library</span>
        </div>

        {/* Card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
          <h1 className="text-white text-2xl font-semibold mb-1">Welcome back</h1>
          <p className="text-zinc-400 text-sm mb-6">Sign in to your account</p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-4">
            <div>
              <label className="text-zinc-400 text-xs mb-1.5 block">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-violet-500 transition-colors"
              />
            </div>

            <div>
              <label className="text-zinc-400 text-xs mb-1.5 block">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                className="w-full bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-violet-500 transition-colors"
              />
            </div>

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-violet-600 hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-2.5 rounded-lg text-sm transition-colors mt-2"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>

          <p className="text-zinc-500 text-sm text-center mt-6">
            Don't have an account?{" "}
            <a href="/register" className="text-violet-400 hover:text-violet-300 transition-colors">
              Register
            </a>
          </p>
        </div>
      </div>
    </div>);
}