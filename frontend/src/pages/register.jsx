import { useState } from "react";
import api from '../api/axios';


export default function Register(){

    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [email,setEmail] = useState('');
    const [success,setSuccess] = useState('');
    const [error,setError] = useState('');
     const [loading, setLoading] = useState(false);

    async function handleRegister(e){

        e.preventDefault();

        try{
            const response = await api.post('/auth/register', {username, password,email});
           setSuccess("Account created! Redirecting to login...");
            setError('')

           setTimeout(() => {
                 window.location.replace('/login');
           }, 3000); // will direct to login page after 3 seconds
            // set a success message if registration is successful. This will provide feedback to the user that their account was created successfully.
        } catch (error) {
            setError("Failed to create account")
        }finally {
      setLoading(false);
    }

    }

    return(<div className="min-h-screen bg-black flex items-center justify-center px-4">
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
          <h1 className="text-white text-2xl font-semibold mb-1">Create an account</h1>
          <p className="text-zinc-400 text-sm mb-6">Start tracking your books today</p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-500/10 border border-green-500/20 text-green-400 text-sm px-4 py-3 rounded-lg mb-4">
              {success}
            </div>
          )}

          <div className="flex flex-col gap-4">
            <div>
              <label className="text-zinc-400 text-xs mb-1.5 block">Username</label>
              <input
                type="text"
                placeholder="yourname"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-violet-500 transition-colors"
              />
            </div>

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
                onKeyDown={(e) => e.key === "Enter" && handleRegister()}
                className="w-full bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-violet-500 transition-colors"
              />
            </div>

            <button
              onClick={handleRegister}
              disabled={loading}
              className="w-full bg-violet-600 hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-2.5 rounded-lg text-sm transition-colors mt-2"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </div>

          <p className="text-zinc-500 text-sm text-center mt-6">
            Already have an account?{" "}
            <a href="/login" className="text-violet-400 hover:text-violet-300 transition-colors">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
    );
}