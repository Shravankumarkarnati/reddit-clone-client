// USERNAME FORMAT

// /^
// (?=.{8,20}$)    //username is 8-20 characters long
// (?![_.])        //no _ or . at the beginning
// (?!.*[_.]{2})   //no __ or _. or ._ or .. inside
// [a-zA-Z0-9._]   //allowed characters
// (?<![_.])       //no _ or . at the end
// $/

export const usernameValid = (username: string): Boolean => {
  const re = new RegExp("^(?=[a-z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$");
  return re.test(username);
};

//  PASSWORD FORMAT
// /^
//   (?=.*\d)          // should contain at least one digit
//   (?=.*[a-z])       // should contain at least one lower case
//   (?=.*[A-Z])       // should contain at least one upper case
//   [a-zA-Z0-9]{8,}   // should contain at least 8 from the mentioned characters
// $/

export const passwordValid = (password: string): Boolean => {
  var re = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );
  return re.test(password);
};

interface checkerTypes {
  type: "password" | "username";
  value: string;
}

export const checker = (details: checkerTypes): number => {
  if (details.type === "username") {
    const result = usernameValid(details.value);
    return result ? 0 : 5;
  }
  const result = passwordValid(details.value);
  return result ? 0 : 7;
};
