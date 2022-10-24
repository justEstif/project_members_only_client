import { useCallback, useEffect, useState } from "react";
import { TMessage } from "./types";
// import useStore from "./store";

/**
 * @description the messages in the db
 * @returns the messages, with or without username and date
 */
const Messages = () => {
  // const token = useStore((state) => state.auth?.token);
  const { execute, status, value, error } = useAsync<TMessage[] | string>(
    getMessages
  );

  if (typeof value === "string") {
    console.error(value); // TODO: If the response === string this is an error
  } else {
    console.table(value);
  }
  return (
    <div>
      {status === "idle" && <div>Start your journey by clicking a button</div>}
      {status === "success" && <div>Works</div>}
      {status === "error" && <div>{error}</div>}
      <button onClick={execute} disabled={status === "pending"}>
        {status !== "pending" ? "Click me" : "Loading..."}
      </button>
    </div>
  );
};

export default Messages;

/**
 * @description custom hook for running async functions immediate and when called
 */
const useAsync = <T, E = "string">(
  asyncFunction: () => Promise<T>,
  immediate = true
) => {
  const [status, setStatus] = useState<
    "idle" | "pending" | "success" | "error"
  >("idle");
  const [value, setValue] = useState<T | null>(null);
  const [error, setError] = useState<E | null>(null);

  const execute = useCallback(async () => {
    setStatus("pending");
    setValue(null);
    setError(null);

    try {
      const response = await asyncFunction();
      setValue(response);
    } catch (error) {
      setError(error as any);
      setStatus("error");
    }
  }, [asyncFunction]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { execute, status, value, error };
};

/**
 * @description async function for getting messages from server
 * @returns the api response if successful
 * @returns error message if fail
 */
const getMessages = async () => {
  const response = await fetch("/api/message", {
    method: "GET",
    // TODO: add the jwt token
    headers: new Headers({
      Authorization: `Bearer ${""}`,
    }),
  });

  if (response.ok) {
    return (await response.json()) as TMessage[];
  } else {
    const error = (await response.json().catch((error) => error)) as string;
    return error;
  }
};
