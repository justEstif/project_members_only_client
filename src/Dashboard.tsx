import { Link } from "react-router-dom";
import useStore from "./store";

/**
 * @description react component that includes the website title and navbar
 */
const Dashboard = () => {
  const { auth, logout } = useStore((state) => state);

  const handleLogout = async () => {
    await fetch("/api/logout", {
      method: "GET",
      headers: new Headers({
        Authorization: `Bearer ${auth?.token}`,
      }),
    });

    logout();
  };
  return (
    <div className="flex flex-col gap-5 justify-center items-center font-dashboard">
      <h1 className="text-4xl md:text-6xl">Talaria</h1>
      <nav>
        <ul className="flex gap-8 text-2xl">
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
    </div>
  );
};

export default Dashboard;
