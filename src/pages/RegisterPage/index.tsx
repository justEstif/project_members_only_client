import Form from "./Form";
import tw from "tailwind-styled-components";

const SPagelayout = tw.main`
container
mx-auto
grid
grid-cols-page
gap-4
mt-12
`;

const Dashboard = () => {
  return (
    <nav className="grid px-10 grid-rows-navbar">
      <img src="/logo.png" className="w-24" />
      <ul className="flex flex-col gap-4 text-lg">
        <li>Home</li>
        <li>Login</li>
        <li>Register</li>
      </ul>
    </nav>
  );
};

const RegisterPage = () => {
  return (
    <SPagelayout>
      <Dashboard />
      <Form />
    </SPagelayout>
  );
};

export default RegisterPage;
