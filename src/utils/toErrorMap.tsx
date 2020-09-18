import { SignError } from "../generated/graphql";

const toErrorMap = (errors: SignError[]) => {
  const errorsObj: Record<string, string> = {};
  errors.forEach((cur) => {
    errorsObj[cur.property] = cur.message;
  });

  return errorsObj;
};

export default toErrorMap;
