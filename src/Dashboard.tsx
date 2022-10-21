import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-5 justify-center items-center font-dashboard">
      <h1 className="text-4xl md:text-6xl">Talaria</h1>
      <nav>
        <ul className="flex gap-8 text-2xl">
          <li>
            <Link to="/">Home</Link>
          </li>

          {/* TODO: Change links based of if there is a user or not */}

          <li>
            <Link to="/login">Login</Link>
          </li>

          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Dashboard;
