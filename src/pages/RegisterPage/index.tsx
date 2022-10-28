import { Link } from "react-router-dom";
import Form from "./Form";

const RegisterPage = () => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-page">
      <div>
        <Form />

        <div className="grid grid-rows-2 gap-4">
          <div className="flex justify-end">
            <button className="border-0 border-b-2 border-black">
              <Link to="/login">Already registered? Login</Link>
            </button>
          </div>
        </div>
      </div>

      <div className="hidden gap-10 my-10 mx-10 lg:flex lg:flex-col">
        <div>
          <p>User access:</p>
          <ul>
            <li>Write messages</li>
            <li>Delete your own message</li>
          </ul>
        </div>
        <div>
          <p>Member access:</p>
          <ul>
            <li>Write messages</li>
            <li>Delete your own message</li>
            <li>Read usernames</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
