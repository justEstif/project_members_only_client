import useStore from "./store";
import { SInput } from "./StyledComponents";
import { TAuth400, TMessage } from "./types";
import { FieldValues, useForm } from "react-hook-form";

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
        Authorization: `Bearer ${token}`, // include user's jwt token
      },
      body: JSON.stringify(values), // add the form values to post req
    });

    if (response.ok) {
      (await response.json()) as { message: TMessage };
      // TODO: render message component here
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

export default MessageForm;
