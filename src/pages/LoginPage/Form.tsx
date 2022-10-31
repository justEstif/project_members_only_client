import { FieldValues, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import tw from "tailwind-styled-components";
import {
  SInput,
  SFormTitle,
  SFieldset as SFieldsetGlobal,
  SLabel,
  SLabelDiv,
  SErrorMsg,
  SForm as SFormGlobal,
  SSubmitBtn,
} from "../../components/SComponents";
import useStore from "../../store";
import { TAuth200 } from "../../types";

const SForm = tw(SFormGlobal)`grid-rows-3`;

type TForm = {
  email: string;
  password: string; // min length 6
};

const Form = () => {
  const login = useStore((state) => state.login);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<TForm>();

  const onSubmit = async (values: FieldValues) => {

    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/login`, {
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
    <SForm onSubmit={handleSubmit(onSubmit)}>
      <SFormTitle>Login to account</SFormTitle>
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
      <SSubmitBtn type="submit">Login</SSubmitBtn>
    </SForm>
  );
};

export default Form;
