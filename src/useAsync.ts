import { useState, useCallback, useEffect } from "react";

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

export default useAsync;
