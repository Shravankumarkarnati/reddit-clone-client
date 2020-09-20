export const validationErrorCodes = {
  usernameFormatError: 5,
  passwordFormatError: 7,

  usernameExistsError: 55,
  emailExistsError: 77,

  incorrectUsername: 555,
  inCorrectPassword: 777,
};

export const validationErrorMessages: { [key: number]: string } = {
  5: "Invalid Username",
  7: "Invalid password",
  55: "Username Already Exists",
  77: "Email Already Registered",
  555: "Incorrect Username",
  777: "Incorrect Password",
};
