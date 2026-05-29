import { useLocation } from "react-router-dom";

export default function Navbar(){

    const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));

  const hideOn = ["/login", "/register"];
  if (hideOn.includes(location.pathname)) return null;

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.replace("/login");
  }
    // reads the user from localStorage and converts it back from string to object.  stored it with JSON.stringify on login — this reverses that.


      return (
     <nav className="bg-zinc-900 border-b border-zinc-800 px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 bg-violet-600 rounded-md flex items-center justify-center">
          <span className="text-white text-xs font-bold">BL</span>
        </div>
        <span className="text-white font-semibold text-sm">Book Library</span>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-zinc-400 text-sm">
          {user?.username}
        </span>
        <button
          onClick={handleLogout}
          className="text-zinc-400 hover:text-white border border-zinc-700 hover:border-zinc-500 text-xs px-3 py-1.5 rounded-lg transition-colors"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}