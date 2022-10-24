import { useCallback, useEffect, useState } from "react";
import { TMessage } from "./types";
import useStore from "./store";

/**
 * @description the messages in the db
 * @returns the messages, with or without username and date
 */
const Messages = () => {
  const token = useStore((state) => state.auth?.token);
  const { execute, status, value, error } = useAsync<
    TMessage[] | string,
    TMsgArg
  >(getMessages, { token: token || "" });

  // TODO: If the response === string this is an error
  if (status === "idle") {
    return <div>Loading ...</div>;
  } else if (status === "error") {
    return <div>{error}</div>;
  } else {
    if (typeof value === "string") {
      return <div>{value}</div>;
    } else {
      if (!value) {
        return <div>{value}</div>;
      } else {
        return value.map((va, i) => <span key={i}>{va.text}</span>);
      }
    }
  }
};

export default Messages;

/**
 * @description custom hook for running async functions immediate and when called
 */
const useAsync = <T, F, E = "string">(
  asyncFunction: (args: F) => Promise<T>,
  funcArgs: F,
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
      const response = await asyncFunction(funcArgs);
      setValue(response);
      setStatus("success");
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
