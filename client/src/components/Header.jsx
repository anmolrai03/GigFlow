import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { logoutApi } from "../apis/authAPI";

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await logoutApi();
    logout();
    navigate("/login");
    setOpen(false);
  };

  const baseLink =
    "block rounded-md px-3 py-2 text-sm font-medium transition";

  const navLinkClass = ({ isActive }) =>
    `${baseLink} ${
      isActive
        ? "bg-slate-100 text-slate-900"
        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
    }`;

  const userInitial = user?.name?.charAt(0)?.toUpperCase();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <NavLink
            to="/home"
            className="text-lg font-semibold text-slate-900"
          >
            GigFlow
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-4 sm:flex">
            {user ? (
              <>
                <NavLink to="/home" className={navLinkClass}>
                  Home
                </NavLink>

                <NavLink to="/dashboard" className={navLinkClass}>
                  Dashboard
                </NavLink>

                <NavLink to="/post-gig" className={navLinkClass}>
                  Post Gig
                </NavLink>

                {/* User Avatar */}
                <div className="relative group">
                  <div className="flex h-8 w-8 cursor-default items-center justify-center rounded-full border border-slate-300 bg-slate-100 text-sm font-medium text-slate-700">
                    {userInitial}
                  </div>

                  {/* Tooltip */}
                  <div className="absolute right-0 top-10 hidden whitespace-nowrap rounded-md border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700 shadow-sm group-hover:block">
                    {user.name}
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className={navLinkClass}>
                  Login
                </NavLink>

                <NavLink
                  to="/register"
                  className="rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800"
                >
                  Register
                </NavLink>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="rounded-md p-2 text-slate-600 hover:bg-slate-100 sm:hidden"
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={
                  open
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {open && (
          <nav className="space-y-1 pb-4 sm:hidden">
            {user ? (
              <>
                <div className="px-3 py-2 text-sm font-medium text-slate-700">
                  Signed in as{" "}
                  <span className="font-semibold">{user.name}</span>
                </div>

                <NavLink
                  to="/home"
                  className={navLinkClass}
                  onClick={() => setOpen(false)}
                >
                  Home
                </NavLink>

                <NavLink
                  to="/dashboard"
                  className={navLinkClass}
                  onClick={() => setOpen(false)}
                >
                  Dashboard
                </NavLink>

                <NavLink
                  to="/post-gig"
                  className={navLinkClass}
                  onClick={() => setOpen(false)}
                >
                  Post Gig
                </NavLink>

                <button
                  onClick={handleLogout}
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-left text-sm font-medium text-slate-700 hover:bg-slate-100"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className={navLinkClass}
                  onClick={() => setOpen(false)}
                >
                  Login
                </NavLink>

                <NavLink
                  to="/register"
                  className="block rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800"
                  onClick={() => setOpen(false)}
                >
                  Register
                </NavLink>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;
