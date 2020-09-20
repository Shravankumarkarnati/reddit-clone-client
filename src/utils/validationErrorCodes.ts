export const validationErrorCodes = {
  usernameFormatError: 5,
  passwordFormatError: 7,
  uuidExpired: 8,
  confirmPasswordNotSame: 9,

  usernameExistsError: 55,
  emailExistsError: 77,

  incorrectUsername: 555,
  inCorrectPassword: 777,
  inCorrectEmail: 999,
};

export const validationErrorMessages: { [key: number]: string } = {
  5: "Invalid Username",
  7: "Invalid password",
  8: "Reset Token Expired",
  9: "Password and Confirm Password Not same",
  55: "Username Already Exists",
  77: "Email Already Registered",
  555: "Incorrect Username",
  777: "Incorrect Password",
};
