import helpers from '../helpers';

const carriersReducer = (state = {}, action) => {
  switch (action.type) {
    case 'home/getCarriers':
      console.log('quotesa',action.quotesA)
      console.log('quotesb',action.quotesB)
      console.log(helpers.createDict(action.quotesA, action.quotesB, 'CarrierId'))
      return helpers.createDict(action.quotesA, action.quotesB, 'CarrierId');
    default:
      return state;
  }
};

export default carriersReducer;
