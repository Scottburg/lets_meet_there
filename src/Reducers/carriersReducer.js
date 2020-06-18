import helpers from '../helpers';

const carriersReducer = (state = {}, action) => {
  switch (action.type) {
    case 'home/getCarriers':
      return helpers.createDict(action.quotesA, action.quotesB, 'CarrierId');
    default:
      return state;
  }
};

export default carriersReducer;
