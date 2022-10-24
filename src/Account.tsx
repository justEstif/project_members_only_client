import { FieldValues, useForm } from "react-hook-form";
import { TUser } from "./types";
import useStore from "./store";
import { SInput } from "./StyledComponents";
/**
 * @description account page function component
 */
const Account = () => {
  // setup form data
  type FormData = {
    name?: string;
    userName?: string;
    email?: string;
    secretKey?: string;
    password?: string; // min length 6
    passwordConfirmation?: string;
  };
  // get token
  // setup react-hook-form
  // return form with secret key input
  // add an onsubmit function to call api
  // update page on form submit success
  // update user ??
  const auth = useStore((state) => state.auth);
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (values: FieldValues) => {
    if (!auth) return; // TODO: better handle
    const response = await fetch(`/api/user/${auth.user.id || ""}`, {
      method: "PUT",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
      body: JSON.stringify(values),
    });

    if (response.ok) {
      const json = await response.json();
      console.log(json);
    } else {
      const error = await response.json().catch((error) => error);
      console.error(error);
    }
  };
  return (
    <div>
      <form
        className="grid grid-cols-1 gap-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label>
          <span className="text-gray-700">Become a member:</span>
          <SInput type="text" {...register("secretKey")} />
        </label>
      </form>
    </div>
  );
};

export default Account;
