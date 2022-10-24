import { TMessage } from "./types";

type TMessages = {
  value: string | TMessage[] | null;
  error: "string" | null;
  status: "idle" | "pending" | "success" | "error";
};

/**
 * @description the messages in the db
 * @returns the messages, username and date
 */
const Messages = ({ value, error, status }: TMessages) => {
  // TODO: If the response === string this is an error
  if (status === "idle") {
    return <div>Loading ...</div>;
  } else if (status === "error") {
    return <div>{error}</div>; // TODO: error handling
  } else {
    if (typeof value === "string") {
      return <div>{value}</div>;
    } else {
      if (!value) {
        return <div>{value}</div>;
      } else {
        const data = value.map((item, i) => <span key={i}>{item.text}</span>);
        return <div>{data}</div>;
      }
    }
  }
};

export default Messages;
