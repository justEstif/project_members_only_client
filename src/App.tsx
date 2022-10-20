// NOTE the name of the website is Hermóðr
// Create layout of the page
import tw from "tailwind-styled-components";

const SPageLayout = tw.main`
  max-w-2xl
  mx-4
  my-10
  md:mx-auto
`;

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-5 items-center">
      {/* TODO: use greek like fonts */}
      <h1 className="text-4xl md:text-6xl">Talaria</h1>
      <nav>
        <ul className="flex gap-8">
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
      <h1>Create an account</h1>
    </SPageLayout>
  );
};

export default App;
