const initialState = {
  drawerVisibility: false,
  user: {},
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "TOGGLE_DRAWER":
      return {
        ...state,
        drawerVisibility: !state.drawerVisibility,
      };
    case "LOGIN":
      return {
        ...state,
        user: payload,
      };

    case "LOGOUT":
      localStorage.clear();

      return {
        ...state,
      };

    default:
      return state;
  }
};
