import { Link } from "react-router-dom";
import Form from "./Form";

const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
  </svg>
);

const MinusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
  </svg>
);

const SidebarContent = () => {
  return (
    <div className="grid grid-rows-3 gap-4 my-10">
      <ul className="flex flex-col gap-3 text-md">
        <h3 className="text-lg">User access:</h3>
        <li className="flex gap-2">
          <PlusIcon />
          Write messages
        </li>
        <li className="flex gap-2">
          <PlusIcon />
          Delete your own message
        </li>
        <li className="flex gap-2">
          <MinusIcon />
          Read usernames
        </li>
        <li className="flex gap-2">
          <MinusIcon />
          Delete other{"'"}s message
        </li>
      </ul>

      <ul className="flex flex-col gap-3 text-md">
        <h3 className="text-lg">Member access:</h3>
        <li className="flex gap-2">
          <PlusIcon />
          Write messages
        </li>
        <li className="flex gap-2">
          <PlusIcon />
          Delete your own message
        </li>
        <li className="flex gap-2">
          <PlusIcon />
          Read usernames
        </li>
        <li className="flex gap-2">
          <MinusIcon />
          Delete other{"'"}s message
        </li>
      </ul>

      <ul className="flex flex-col gap-3 text-md">
        <h3 className="text-lg">Admin access(limited):</h3>
        <li className="flex gap-2">
          <PlusIcon />
          Write messages
        </li>
        <li className="flex gap-2">
          <PlusIcon />
          Delete your own message
        </li>
        <li className="flex gap-2">
          <PlusIcon />
          Read usernames
        </li>
        <li className="flex gap-2">
          <PlusIcon />
          Delete other{"'"}s message
        </li>
      </ul>
    </div>
  );
};

type ISidebar = {
  childComp: JSX.Element;
};

const Sidebar: React.FC<ISidebar> = (props: ISidebar) => (
  <div className="hidden px-10 lg:flex lg:flex-col">{props.childComp}</div>
);

const RegisterPage = () => {
  return (
    <>
      <section>
        <Form />

        <div className="flex justify-end">
          <button className="border-0 border-b-2 border-black">
            <Link to="/login">Already registered? Login</Link>
          </button>
        </div>
      </section>

      <Sidebar childComp={SidebarContent()} />
    </>
  );
};

export default RegisterPage;
