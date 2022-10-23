import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import useStore from "./store";
import { SInput } from "./StyledComponents";
import { TAuth400, TMessage } from "./types";

/**
 * @description the messages in the db
 * @returns the messages, with or without username and date
 */
const Messages = () => {
  const [messages, setMessages] = useState<TMessage[] | null>(null);
  const token = useStore((state) => state.auth?.token);

  useEffect(() => {
    const getMessages = async () => {
      const response = await fetch("/api/message", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const json = (await response.json()) as TMessage[];
        setMessages(json);
      } else {
        const error = (await response.json().catch((error) => error)) as string;
        console.log(error); // TODO: better error handling
      }
    };

    getMessages();
  }, []);

  if (messages) {
    if (messages.length === 0) {
      return <span>Be the first to write a message!</span>;
    }
    return (
      // TODO: Improve output
      <div>
        {messages.map((message, i) => (
          <span key={i}>
            {message.user ? message.user.userName : "anon"}
            {message.text}
          </span>
        ))}
      </div>
    );
  }
  return <span>Error loading</span>;
};

/**
 * @description the new message form that is only accessible to logged in users
 */
const MessageForm = () => {
  type FormData = {
    text: string;
  };
  const { register, handleSubmit } = useForm<FormData>();
  const token = useStore((state) => state.auth?.token);
  const onSubmit = async (values: FieldValues) => {
    const response = await fetch("/api/message", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    });

    if (response.ok) {
      (await response.json()) as { message: TMessage };
      // TODO: handle successful output
    } else {
      (await response.json().catch((error) => error)) as TAuth400;
      // TODO: handle error
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        <div className="flex gap-3">
          <button type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>

          <SInput
            type="message"
            placeholder="Enter your message"
            {...register("text", { required: true })}
          />
        </div>
      </label>
    </form>
  );
};

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
