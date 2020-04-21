import helpers from '../helpers';

const carriersReducer = (state = {}, action) => {
  switch (action.type) {
    case 'GETCARRIERS':
      return helpers.createDict(action.quotesA, action.quotesB, 'CarrierId');
    default:
      return state;
  }
};

export default carriersReducer;
