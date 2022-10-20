import { FieldValues, useForm } from "react-hook-form";
import SInput from "./SInput";

const LoginForm = () => {
  type FormData = {
    email: string;
    password: string; // min length 6
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (values: FieldValues) => {
    console.log(values);
  };

  return (
    <div className="container my-10 mx-auto max-w-sm font-heading">
      <form
        className="grid grid-cols-1 gap-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label>
          <span className="text-gray-700">Email</span>
          <SInput
            type="email"
            {...register("email", {
              required: true,
              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            })}
          />

          {errors.email && errors.email.type === "required" && (
            <span role="alert">This field is required</span>
          )}

          {errors.email && errors.email.type === "pattern" && (
            <span role="alert">Invalid email</span>
          )}
        </label>

        <label>
          <span className="text-gray-700">Password</span>
          <SInput
            {...register("password", {
              required: true,
              minLength: 6,
            })}
            type="password"
          />

          {errors.password && errors.password.type === "required" && (
            <span role="alert">This field is required</span>
          )}

          {errors.password && errors.password.type === "minLength" && (
            <span role="alert">Password must be at least 6 characters.</span>
          )}
        </label>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
