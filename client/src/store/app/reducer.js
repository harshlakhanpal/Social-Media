const initialState = {
  check: false,
  user: {},
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "CHECK":
      return {
        ...state,
        check: !state.check,
      };
    case "LOGIN":
      return {
        ...state,
        user: payload,
      };

    default:
      return state;
  }
};
