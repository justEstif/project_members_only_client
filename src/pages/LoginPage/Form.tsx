import { FieldValues, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import tw from "tailwind-styled-components";
import useStore from "../../store";
import { TAuth200 } from "../../types";

const SInput = tw.input`
${(p: { $error: boolean }) => (p.$error ? "border-red-500" : "border-black")}
${(p: { $error: boolean }) => (p.$error ? "focus:border-0" : "focus:border-2")}
px-2 py-1 w-full bg-gray-300 rounded-md border-2`;
const SLabel = tw.label`grid grid-rows-2 gap-2`;
const SFieldset = tw.fieldset`w-1/2 grid grid-rows-2 gap-6 mb-8`;
const SLabelDiv = tw.div`flex justify-between`;
const SErrorMsg = tw.p`text-red-500`;
const SFormTitle = tw.h1`mb-8 text-3xl`;

type TForm = {
  email: string;
  password: string; // min length 6
};

const Form = () => {
  const login = useStore((state) => state.login);

  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors },
  } = useForm<TForm>();

  const onSubmit = async (values: FieldValues) => {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (response.ok) {
      const auth = (await response.json()) as TAuth200;
      login(auth);
    } else {
      const error = (await response.json().catch((error) => error)) as string;
      setError("password", {
        type: "custom",
        message: error,
      });
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SFormTitle>Login to account</SFormTitle>
      <SFieldset>
        <SLabel>
          <SLabelDiv>
            <p>Email</p>

            {errors.email && errors.email.type === "required" && (
              <SErrorMsg role="alert">This field is required</SErrorMsg>
            )}

            {errors.email && errors.email.type === "pattern" && (
              <SErrorMsg role="alert">Invalid email</SErrorMsg>
            )}
          </SLabelDiv>
          <SInput
            type="email"
            $error={errors.email ? true : false}
            {...register("email", {
              required: true,
              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            })}
          />
        </SLabel>

        <SLabel>
          <SLabelDiv>
            <p>Password</p>

            {errors.password && errors.password.type === "required" && (
              <SErrorMsg role="alert">This field is required</SErrorMsg>
            )}

            {errors.password && errors.password.type === "minLength" && (
              <SErrorMsg role="alert">
                Password must be at least 6 characters.
              </SErrorMsg>
            )}
            {errors.password && errors.password.type === "custom" && (
              <SErrorMsg role="alert">Incorrect email or password</SErrorMsg>
            )}
          </SLabelDiv>
          <SInput
            type="password"
            $error={errors.password ? true : false}
            {...register("password", {
              required: true,
              minLength: 6,
            })}
          />
        </SLabel>
      </SFieldset>
      <div className="grid grid-rows-2 gap-4">
        <button className="py-2 px-5 bg-green-400" type="submit">
          <Link to="/login">Login</Link>
        </button>
        <div className="flex justify-end">
          <button className="border-0 border-b-2 border-black">
            <Link to="/register">Don{"'"}t have an account? Register</Link>
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
