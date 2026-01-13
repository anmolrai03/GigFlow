import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import { logoutApi } from "../apis/authAPI";

function Header() {

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutApi();
    logout();
    navigate("/login");
  };

  return (
    <header>
      <nav>
        {user ? (
          <>
            <NavLink to="/home">Home</NavLink>
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/post-gig">Post Gig</NavLink>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
