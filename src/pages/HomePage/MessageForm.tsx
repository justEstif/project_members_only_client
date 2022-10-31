import useStore from "../../store";
import SInput from "../../components/SInput";
import { TAuth400, TMessage } from "../../types";
import { FieldValues, useForm } from "react-hook-form";

type TMessageForm = {
  execute: () => Promise<void>;
};

/**
 * @description the new message form that is only accessible to logged in users
 */
const MessageForm = ({ execute }: TMessageForm) => {
  type FormData = {
    text: string;
  };
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<FormData>();
  const token = useStore((state) => state.auth?.token);

  /**
   * @description form submit function; send post request to api/message
   * @fires execute: function will get messages again on submit
   */
  const onSubmit = async (values: FieldValues) => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/message`,
      {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // include user's jwt token
        },
        body: JSON.stringify(values), // add the form values to post req
      }
    );

    if (response.ok) {
      (await response.json()) as { message: TMessage };
      execute(); // get messages
      reset(); // reset form
    } else {
      /** returns string, if there is an error */
      const error = (await response.json().catch((error) => error)) as string;
      setError("text", {
        type: "custom",
        message: error,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="py-5">
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

          {errors.text && errors.text.type === "custom" && (
            <span role="alert">{errors.text.message}</span>
          )}
        </div>
      </label>
    </form>
  );
};

export default MessageForm;
