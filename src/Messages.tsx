import tw from "tailwind-styled-components";
import { TMessage } from "./types";

type TMessages = {
  messages: string | TMessage[] | null;
  error: string | null;
  status: "idle" | "pending" | "success" | "error";
};

const SMessage = tw.div`
  border-b-2
  border-gray-200
  font-body
  grid
  grid-cols-2
  py-2
  w-full
`;

/**
 * @description the messages in the db
 * @returns the messages, username and date
 */
const Messages = ({ messages, error, status }: TMessages) => {
  if (status === "idle") {
    return <div>Loading ...</div>;
  } else if (status === "error") {
    return <div>{error}</div>; // TODO: error handling
  } else {
    // TODO: If the response === string this is an error
    if (typeof messages === "string") {
      return <div>{messages}</div>;
    } else {
      if (!messages) {
        return <div>{messages}</div>;
      } else {
        if (messages.length === 0) {
          return <div>Be the first to write a message!</div>;
        }

        return (
          <div className="grid grid-cols-1 gap-4">
            {messages.map((item, i) => (
              <SMessage key={i}>
                <div className="grid grid-rows-2 gap-1">
                  {item.user ? (
                    <div className="text-green-700">{item.user.userName}</div>
                  ) : (
                    <div className="text-lg text-green-700">anonymous</div>
                  )}
                  <div>
                    <div>{new Date(item.createdAt).toLocaleTimeString()}</div>
                    <div>{new Date(item.createdAt).toDateString()}</div>
                  </div>
                </div>
                <div className="text-lg text-blue-700 break-words font-heading">
                  {item.text}
                </div>
              </SMessage>
            ))}
          </div>
        );
      }
    }
  }
};

export default Messages;
