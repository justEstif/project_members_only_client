import tw from "tailwind-styled-components";

const SInput = tw.input`px-2 py-1 w-full bg-gray-300 rounded-md border-2 border-black focus:border-0`;
const SLabel = tw.label`grid grid-rows-2 gap-2`;
const SFieldset = tw.fieldset`grid grid-rows-4 gap-6 mb-8`;
const SLabelDiv = tw.div`flex justify-between`;
const SErrorMsg = tw.p`text-red-500`;

const Form = () => {
  return (
    <form>
      <h1 className="mb-8 text-3xl">Create an account</h1>

      <SFieldset>
        <SLabel>
          <SLabelDiv>
            <p>Name</p>
            <SErrorMsg>Error message</SErrorMsg>
          </SLabelDiv>
          <SInput />
        </SLabel>

        <SLabel>
          <SLabelDiv>
            <p>Email</p>
            <SErrorMsg>Error message</SErrorMsg>
          </SLabelDiv>
          <SInput />
        </SLabel>

        <SLabel>
          <SLabelDiv>
            <p>Password</p>
            <SErrorMsg>Error message</SErrorMsg>
          </SLabelDiv>
          <SInput />
        </SLabel>

        <SLabel>
          <SLabelDiv>
            <p>Confirm Password</p>
            <SErrorMsg>Error message</SErrorMsg>
          </SLabelDiv>
          <SInput />
        </SLabel>
      </SFieldset>

      <div className="grid grid-rows-2 gap-4">
        <button className="py-2 px-5 bg-green-400" type="submit">
          Register
        </button>
        <div className="flex justify-end w-">
          <button className="border-0 border-b-2 border-black">
            Already registered? Login
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
