const jwt = require("jsonwebtoken");

const checkAuth = (context) => {
  const authHeader = context.headers.authorization;
  if (authHeader) {
    const token = authHeader.split("Bearer ")[1];
    if (token) {
      try {
        const user = jwt.verify(token, "mysecret");
        return user;
      } catch (error) {
        throw new Error(error);
      }
    }
    throw new Error("Auth token not of the right format");
  }
  throw new Error("Auth token not found");
};

module.exports = checkAuth;
