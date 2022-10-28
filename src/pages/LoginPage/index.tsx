import { Link } from "react-router-dom";
import Form from "./Form";

const LoginPage = () => {
  return (
    <>
      <section>
        <Form />

        <div className="flex justify-end">
          <button className="border-0 border-b-2 border-black">
            <Link to="/register">Don{"'"}t have an account? Register</Link>
          </button>
        </div>
      </section>
    </>
  );
};

export default LoginPage;
