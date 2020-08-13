const initialState = {
  check: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "CHECK":
      return {
        ...state,
        check: !state.check,
      };

    default:
      return state;
  }
};
