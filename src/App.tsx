import tw from "tailwind-styled-components";
import RegisterForm from "./RegisterForm";

const SPageLayout = tw.main`
  max-w-2xl
  mx-4
  my-10
  md:mx-auto
`;

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-5 items-center font-dashboard">
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

const App = () => {
  return (
    <SPageLayout>
      <Dashboard />
      <RegisterForm />
    </SPageLayout>
  );
};

export default App;
