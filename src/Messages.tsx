import tw from "tailwind-styled-components";
import { TMessage } from "./types";
import useStore from "./store";

type TMessages = {
  messages: string | TMessage[] | null;
  error: string | null;
  status: "idle" | "pending" | "success" | "error";
};

const EditIcon = () => (
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
      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
    />
  </svg>
);

const DeleteIcon = () => (
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
      d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

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
  const user = useStore((state) => state.auth?.user);
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

                <div>
                  {item.user?.userName === user?.userName ? (
                    <div className="flex gap-4 justify-end pb-3">
                      <EditIcon />
                      <DeleteIcon />
                    </div>
                  ) : user?.role === "ADMIN" ? (
                    <div>Only show delete button</div>
                  ) : (
                    ""
                  )}

                  <div className="text-lg text-blue-700 break-words font-heading">
                    {item.text}
                  </div>
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
