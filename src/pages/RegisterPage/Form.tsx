import { FieldValues, useForm } from "react-hook-form";
import {
  SInput,
  SFormTitle,
  SLabel,
  SLabelDiv,
  SErrorMsg,
  SForm,
  SSubmitBtn,
} from "../../components/SComponents";
import useStore from "../../store";
import { TAuth200 } from "../../types";

type TForm = {
  name: string;
  userName: string;
  email: string;
  password: string; // min length 6
  passwordConfirmation: string;
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
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/register`,
      {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }
    );

    if (response.ok) {
      const auth = (await response.json()) as TAuth200;
      login(auth);
    } else {
      const error = (await response.json().catch((error) => error)) as string;
      setError("email", {
        type: "custom",
        message: error,
      });
    }
  };

  return (
    <SForm onSubmit={handleSubmit(onSubmit)}>
      <SFormTitle>Create an account</SFormTitle>

      <SLabel>
        <SLabelDiv>
          <p>Name</p>
          {errors.name && errors.name.type === "required" && (
            <SErrorMsg role="alert">This field is required</SErrorMsg>
          )}

          {errors.name && errors.name.type === "pattern" && (
            <SErrorMsg role="alert">Invalid input</SErrorMsg>
          )}
        </SLabelDiv>
        <SInput
          type="text"
          $error={errors.name ? true : false}
          {...register("name", { required: true, pattern: /^[A-Za-z]+$/i })}
        />
      </SLabel>

      <SLabel>
        <SLabelDiv>
          <p>Username</p>
          <SErrorMsg>
            {errors.userName && errors.userName.type === "required" && (
              <SErrorMsg role="alert">This field is required</SErrorMsg>
            )}
          </SErrorMsg>
        </SLabelDiv>
        <SInput
          type="text"
          $error={errors.userName ? true : false}
          {...register("userName", { required: true })}
        />
      </SLabel>

      <SLabel>
        <SLabelDiv>
          <p>Email</p>

          {errors.email && errors.email.type === "required" && (
            <SErrorMsg role="alert">This field is required</SErrorMsg>
          )}

          {errors.email && errors.email.type === "pattern" && (
            <SErrorMsg role="alert">Invalid email</SErrorMsg>
          )}

          {errors.email && errors.email.type === "custom" && (
            <SErrorMsg role="alert">{errors.email.message}</SErrorMsg>
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

      <SLabel>
        <SLabelDiv>
          <p>Confirm Password</p>

          {errors.passwordConfirmation &&
            errors.passwordConfirmation.type === "required" && (
              <SErrorMsg role="alert">This field is required</SErrorMsg>
            )}

          {errors.passwordConfirmation &&
            errors.passwordConfirmation.type === "validate" && (
              <SErrorMsg role="alert">Passwords {"don't"} match.</SErrorMsg>
            )}
        </SLabelDiv>
        <SInput
          type="password"
          $error={errors.passwordConfirmation ? true : false}
          {...register("passwordConfirmation", {
            required: true,
            validate: (value) => value === getValues("password"),
          })}
        />
      </SLabel>

      <SSubmitBtn type="submit">Register</SSubmitBtn>
    </SForm>
  );
};

export default Form;
