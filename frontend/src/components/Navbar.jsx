export default function Navbar(){

    const user  = JSON.parse(localStorage.getItem('user'))

    // reads the user from localStorage and converts it back from string to object.  stored it with JSON.stringify on login — this reverses that.


      return (
    <nav>
      <a href="/books">Book Library</a>

      <div>
        {user ? (
          <span>Welcome, {user.username}</span>
        ) : (
          <div>
            <a href="/login">Login</a>
            <a href="/register">Register</a>
          </div>
        )}
      </div>
    </nav>
  );
}