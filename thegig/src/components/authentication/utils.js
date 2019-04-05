
export const regexTester = (fName, lName, email, password) => {
  if (!/^[a-zA-Z]+$/.test(fName)) {
    return alert("Please insert a valid first name");
  }
  if (!/^[a-zA-Z]+$/.test(lName)) {
    return alert("Please insert a valid last name");
  }
  if (
    // The original line had to be commented out to get rid of yellow warning, comment back in if needed
    // !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    !/^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    )
  ) {
    return alert("Please insert a valid email address");
  }
  if (password.length < 6) {
    return alert("Password must have 6 characters or more");
  }
};
