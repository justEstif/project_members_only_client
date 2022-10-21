import { Link } from "react-router-dom";
import useStore from "./store";

/**
 * @description react component that includes the website title and navbar
 */
const Dashboard = () => {
  const auth = useStore((state) => state.auth);
  return (
    <div className="flex flex-col gap-5 justify-center items-center font-dashboard">
      <h1 className="text-4xl md:text-6xl">Talaria</h1>
      <nav>
        <ul className="flex gap-8 text-2xl">
          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            {!auth ? (
              <Link to="/login">Login</Link>
            ) : (
              <Link to="/account">Account</Link>
            )}
          </li>

          <li>
            {!auth ? (
              <Link to="/register">Register</Link>
            ) : (
              <Link to="/logout">Logout</Link>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Dashboard;
