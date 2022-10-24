import useStore from "./store";
import MessageForm from "./MessageForm";
import Messages from "./Messages";

/**
 * @description home page
 * @returns new message form, and messages
 */

const Home = () => {
  const auth = useStore((state) => state.auth);
  return (
    <div className="container my-10 mx-auto font-heading">
      {/* TODO: Don't show the form if there is no user */}
      {auth ? <MessageForm /> : <span>Login</span>}
      <Messages />
    </div>
  );
};

export default Home;
