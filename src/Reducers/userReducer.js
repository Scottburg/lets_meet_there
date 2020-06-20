const initialState = {
  user: {}
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'addUser':
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
};

export default userReducer;
