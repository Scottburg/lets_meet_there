import carriersReducer from './carriersReducer';

describe('carriersReducer', () => {
  it('should should reduce the quote arrays into one state object', () => {
    expect(carriersReducer({}, {
      type: 'home/getCarriers',
      quotesA: [{Name: "United Arab Emirates",CarrierId: 837}],
      quotesB: [
        {Name: "Austria",CarrierId: 839},
        {Name:"Finnair", CarrierId: 857}
      ]
    })).toEqual({
      837: {CarrierId: 837, Name: "United Arab Emirates"},
      839: {Name: "Austria",CarrierId: 839},
      857:{Name:"Finnair", CarrierId: 857}
    })
  })

  it('it should return empty state if no action defined', () => {
    expect(carriersReducer({}, {})).toEqual({});
  })

  it('it should only return one carrier if duplicated both quote inputs', () => {
    expect(carriersReducer({}, {
      type: 'home/getCarriers',
      quotesA: [{Name: "United Arab Emirates",CarrierId: 837}],
      quotesB: [{Name: "United Arab Emirates",CarrierId: 837}]
    })).toEqual({837: {CarrierId: 837, Name: "United Arab Emirates"}})
  })
})
