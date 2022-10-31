import { Link, useNavigate } from "react-router-dom";
import useStore from "../store";

/**
 * @description react component that includes the website title and navbar
 * @returns website title and navbar
 */
const Dashboard = () => {
  const { auth, logout } = useStore((state) => state);
  const navigate = useNavigate();

  /**
   * @description function for logging out user invalidates jwt and create cookies
   */
  const handleLogout = async () => {
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/logout`, {
      method: "GET",
      headers: new Headers({
        Authorization: `Bearer ${auth?.token}`,
      }),
    });

    logout();
    location.reload(); // refresh page on logout
  };
  return (
    <nav className="grid px-10 grid-rows-navbar">
      <img src="/logo.png" className="w-24" />
      <ul className="flex flex-col gap-4 text-lg">
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          {auth ? (
            <Link to="/account">Account</Link>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </li>

        <li>
          {auth ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <Link to="/register">Register</Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Dashboard;
