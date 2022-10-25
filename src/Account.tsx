import { FieldValues, useForm } from "react-hook-form";
import { TUser } from "./types";
import useStore from "./store";
import { SInput } from "./StyledComponents";
import { useNavigate } from "react-router-dom";

/**
 * @description account page function component
 */
const Account = () => {
  type FormData = {
    name?: string;
    userName?: string;
    email?: string;
    secretKey?: string;
    password?: string; // min length 6
    passwordConfirmation?: string;
  };
  const { auth, updateUser } = useStore((state) => state);
  const { register, handleSubmit } = useForm<FormData>();
  const navigate = useNavigate();

  /**
   * @description update the user on form submit
   */
  const onSubmit = async (values: FieldValues) => {
    const response = await fetch(`/api/user/${auth ? auth.user.id : ""}`, {
      method: "PUT",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth ? auth.token : ""}`,
      },
      body: JSON.stringify(values),
    });

    if (response.ok) {
      const user = (await response.json()) as TUser;
      if (auth?.token) {
        updateUser({ user: user, token: auth?.token });
        navigate("/");
      } else {
        const error = await response.json().catch((error) => error);
        console.error(error);
      }
    }
  };

  const UpdateForm = () => {
    if (auth && auth.user.role === "USER") {
      return (
        <div>
          <span className="text-gray-700">Become a member:</span>
          <SInput type="text" {...register("secretKey")} />
        </div>
      );
    } else if (auth && auth.user.role === "MEMBER") {
      return (
        <div>
          <span className="text-gray-700">Become an admin:</span>
          <SInput type="text" {...register("secretKey")} />
        </div>
      );
    } else if (auth && auth.user.role === "ADMIN") {
      return (
        <div>
          <span className="text-gray-700">Already admin</span>
        </div>
      );
    } else {
      return <div>Nothing to show</div>;
    }
  };

  return (
    <div>
      <form
        className="grid grid-cols-1 gap-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label>
          <UpdateForm />
        </label>
      </form>
    </div>
  );
};

export default Account;
