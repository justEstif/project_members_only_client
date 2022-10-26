import tw from "tailwind-styled-components";
import { TMessage } from "../../types";
import useStore from "../../store";

type TMessages = {
  value: TMessage[] | string | null;
  error: string | null;
  status: "idle" | "pending" | "success" | "error";
  execute: () => Promise<void>;
};

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
const Messages = ({ value: messages, error, status, execute }: TMessages) => {
  const auth = useStore((state) => state.auth);

  const handleMessageDelete = async (id: string) => {
    const response = await fetch(`/api/message/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${auth?.token}`,
      },
    });

    if (response.ok) {
      execute();
    }
  };

  if (status === "idle") {
    return (
      <div role="status" className="max-w-sm animate-pulse">
        <div className="mb-4 w-48 h-2.5 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        <div className="mb-2.5 h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
        <div className="mb-2.5 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        <div className="mb-2.5 h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px]"></div>
        <div className="mb-2.5 h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px]"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
      </div>
    );
  } else if (status === "error") {
    return (
      <div
        className="relative py-3 px-4 text-red-700 bg-red-100 rounded border border-red-400"
        role="alert"
      >
        <strong className="mr-1 font-bold">Error getting messages!</strong>
        <span className="block sm:inline">Try again or contact developer</span>
        <span className="absolute top-0 right-0 bottom-0 py-3 px-4"></span>
      </div>
    );
  } else {
    if (!messages || typeof messages === "string") {
      return (
        <div
          className="flex items-center py-3 px-4 text-sm font-bold text-white bg-blue-500"
          role="alert"
        >
          {messages ? (
            <p>{messages}</p>
          ) : (
            <p>There appears to be no messages</p>
          )}
        </div>
      );
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
                  <div className="text-green-700">
                    {item.user.userName === auth?.user?.userName
                      ? item.user.userName + "(me)"
                      : item.user.userName}
                  </div>
                ) : (
                  <div className="text-lg text-green-700">anonymous</div>
                )}
                <div>
                  <div>{new Date(item.createdAt).toLocaleTimeString()}</div>
                  <div>{new Date(item.createdAt).toDateString()}</div>
                </div>
              </div>

              <div>
                {auth?.user && item.user?.userName === auth?.user?.userName ? (
                  <div className="flex gap-4 justify-end pb-3">
                    <button
                      onClick={async () => await handleMessageDelete(item.id)}
                      className="text-red-500 hover:text-red-800"
                    >
                      <DeleteIcon />
                    </button>
                  </div>
                ) : auth?.user?.role === "ADMIN" ? (
                  <button
                    onClick={async () => await handleMessageDelete(item.id)}
                  >
                    <DeleteIcon />
                  </button>
                ) : null}

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
};

export default Messages;
