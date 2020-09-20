import { SignError } from "../generated/graphql";
import { validationErrorMessages } from "./validationErrorCodes";

const toErrorMap = (errors: SignError[]) => {
  const errorsObj: Record<string, string> = {};
  errors.forEach((cur) => {
    errorsObj[cur.property] = validationErrorMessages[cur.errorCode];
  });

  return errorsObj;
};

export default toErrorMap;
