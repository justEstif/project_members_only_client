import { FieldValues, useForm } from "react-hook-form";
import SInput from "./SInput";

const RegisterForm = () => {
  type FormData = {
    name: string;
    userName: string;
    email: string;
    password: string; // min length 6
    passwordConfirmation: string;
  };
  const {
    register,
    handleSubmit,
    getValues,
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
          <span className="text-gray-700">Full Name</span>
          <SInput
            type="text"
            {...register("name", { required: true, pattern: /^[A-Za-z]+$/i })}
          />

          {errors.name && errors.name.type === "required" && (
            <span role="alert">This field is required</span>
          )}

          {errors.name && errors.name.type === "pattern" && (
            <span role="alert">
              Invalid input; only english alphabets are accepted
            </span>
          )}
        </label>

        <label>
          <span className="text-gray-700">Username</span>
          <SInput type="text" {...register("userName", { required: true })} />

          {errors.userName && errors.userName.type === "required" && (
            <span role="alert">This field is required</span>
          )}
        </label>
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

        <label>
          <span className="text-gray-700">Confirm Password</span>
          <SInput
            {...register("passwordConfirmation", {
              required: true,
              validate: (value) => value === getValues("password"),
            })}
            type="password"
          />

          {errors.passwordConfirmation &&
            errors.passwordConfirmation.type === "required" && (
              <span role="alert">This field is required</span>
            )}

          {errors.passwordConfirmation &&
            errors.passwordConfirmation.type === "validate" && (
              <span role="alert">Passwords {"don't"} match.</span>
            )}
        </label>

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterForm;
