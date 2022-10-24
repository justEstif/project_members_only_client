import { useEffect, useState } from "react";
import { TMessage } from "./types";
import useStore from "./store";

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
    } else {
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
  } else {
    return <span>Error loading</span>;
  }
};

export default Messages;
