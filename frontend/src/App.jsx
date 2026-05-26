import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';

/// Above imports  wraps your entire app and enables client side routing. Without this, clicking links would make full page requests to the server instead of React handling them
import Login from './pages/login';
import Register from './pages/register';
import Books from './pages/Books';
import Navbar from './components/Navbar';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />; //ternary Operator
}

// — a custom component that checks for a token. If token exists it renders the children (the actual page). If not it redirects to login with <Navigate to="/login" />. This is the standard pattern for protected pages in React.

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/books"
          element={
            <ProtectedRoute>
              <Books />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}