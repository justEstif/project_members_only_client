import useStore from "./store";
import MessageForm from "./MessageForm";
import Messages from "./Messages";
import { TMessage } from "./types";
import useAsync from "./useAsync";

/**
 * @description home page
 * @returns new message form, and messages
 */
const Home = () => {
  const auth = useStore((state) => state.auth);

  const { execute, status, value, error } = useAsync<
    TMessage[] | string,
    TMsgArg
  >(getMessages, { token: auth?.token || "" });
  return (
    <div className="container my-10 mx-auto font-heading">
      {auth ? <MessageForm execute={execute} /> : <span>Login</span>}
      <Messages messages={value} error={error} status={status} />
    </div>
  );
};

export default Home;

type TMsgArg = {
  token: string;
};

/**
 * @description async function for getting messages from server
 * @returns the api response if successful
 * @returns error message if fail
 */
const getMessages = async ({ token }: TMsgArg) => {
  const response = await fetch("/api/message", {
    method: "GET",
    headers: new Headers({
      Authorization: `Bearer ${token}`,
    }),
  });

  if (response.ok) {
    return (await response.json()) as TMessage[];
  } else {
    const error = (await response.json().catch((error) => error)) as string;
    return error;
  }
};
