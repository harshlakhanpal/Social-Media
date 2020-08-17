const jwt = require("jsonwebtoken");

const checkAuth = (context) => {
  const token = JSON.parse(context.headers.authorization);
  //   console.log(token);

  if (token !== "") {
    try {
      const user = jwt.verify(token, "mysecret");
      // console.log(user);
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }
};

module.exports = checkAuth;
