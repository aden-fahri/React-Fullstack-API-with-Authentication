import { Link, Outlet, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/appContext";
import { useContext } from "react";

export default function Layout() {
  const { user, token, setUser, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  async function handleLogout(e) {
    e.preventDefault();

    const res = await fetch("/api/logout", {
      headers: {
        authorization: `Bearer ${token}`,
      },
      method: "post",
    });

    const data = await res.json();

    if (res.ok) {
      setToken(null);
      setUser(null);
      localStorage.removeItem("token");
      navigate("/login");
    }
  }

  return (
    <>
      <header className="header-bg">
        <nav className="nav-container">
          <Link to="/" className="nav-brand">
            MyBlog
          </Link>

          {user ? (
            <div className="nav-actions">
              <p className="nav-welcome">welcome, {user.name}!</p>

              <Link to="/Create" className="nav-link">
                New Post
              </Link>

              <button onClick={handleLogout} className="nav-link nav-link--btn">
                Logout
              </button>
            </div>
          ) : (
            <div className="nav-actions">
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </div>
          )}
        </nav>
      </header>

      <main className="main-content">
        <Outlet />
      </main>
    </>
  );
}
