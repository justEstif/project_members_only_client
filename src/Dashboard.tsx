const Dashboard = () => {
  return (
    <div className="flex flex-col gap-5 justify-center items-center font-dashboard">
      <h1 className="text-4xl md:text-6xl">Talaria</h1>
      <nav>
        <ul className="flex gap-8 text-2xl">
          <li>Home</li>
          <li>Login</li>
          <li>Register</li>
        </ul>
      </nav>
    </div>
  );
};

export default Dashboard;
