import tw from "tailwind-styled-components";

export const SInput = tw.input`
${(p: { $error: boolean }) => (p.$error ? "border-red-500" : "border-black")}
${(p: { $error: boolean }) => (p.$error ? "focus:border-0" : "focus:border-2")}
px-2 py-1 w-full bg-gray-300 rounded-md border-2`;
export const SLabel = tw.label`grid grid-rows-2 gap-2`;
export const SFieldset = tw.fieldset`grid grid-rows-4 gap-6 mb-8`;
export const SForm = tw.form`grid grid-rows-7 gap-6 mb-8`;
export const SLabelDiv = tw.div`flex justify-between`;
export const SErrorMsg = tw.p`text-red-500`;
export const SFormTitle = tw.h1`mb-8 text-3xl`;
export const SSubmitBtn = tw.button`py-2 px-5 bg-green-400`;
