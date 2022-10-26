import { Link } from "react-router-dom";
import MessageForm from "./MessageForm";
import Messages from "./Messages";
import useStore from "../store";
import { TMessage } from "../types";
import useAsync from "../useAsync";

/**
 * @description home page
 * @returns if auth: new message form and messages; else only messages
 */
const HomePage = () => {
  /** auth from zustand store */
  const auth = useStore((state) => state.auth);

  /** get messages with token*/
  const { execute, status, value, error } = useAsync<
    TMessage[] | string,
    TGetMessages
  >(getMessages, { token: auth?.token || "" });

  return (
    <div className="container my-10 mx-auto font-heading">
      {auth ? (
        <MessageForm execute={execute} />
      ) : (
        <div className="py-5 underline underline-offset-8 decoration-red-500">
          <Link to="/login">Login to write a message</Link>
        </div>
      )}
      <Messages execute={execute} value={value} error={error} status={status} />
    </div>
  );
};

export default HomePage;

type TGetMessages = {
  token: string;
};

/**
 * @description async function for getting messages from server
 * @returns the api response if successful; else empty object
 */
const getMessages = async ({ token }: TGetMessages) => {
  const response = await fetch("/api/message", {
    method: "GET",
    headers: new Headers({
      Authorization: `Bearer ${token}`,
    }),
  });

  if (response.ok) {
    return (await response.json()) as TMessage[];
  } else {
    const error = await response.json().catch((error) => error);
    if (typeof error === "string") {
      return error as string;
    }
    throw new Error(error);
  }
};
