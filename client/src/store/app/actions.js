export const check = () => {
  return { type: "CHECK" };
};

export const login = (data) => {
  return { type: "LOGIN", payload: data };
};
