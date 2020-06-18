import placesReducer from './placesReducer';

const mocks = {
  quotesA: [{
      Name: "United Arab Emirates",
      PlaceId: 837,
      SkyscannerCode: "AE",
      Type: "Country"
  }],
  quotesB:[{
      Name: "Austria",
      PlaceId: 852,
      SkyscannerCode: "AT",
      Type: "Country"
    },
    {
      Name:"Finland", 
      PlaceId: 1081,
      SkyscannerCode: "FI",
      Type: "Country"
    }
  ],
  ua: {
    Name: "United Arab Emirates",
    PlaceId: 837,
    SkyscannerCode: "AE",
    Type: "Country"
  }
  
}

describe('placesReducer', () => {
  it('should should reduce the quote arrays into one state object', () => {
    expect(placesReducer({}, {
      type: 'home/getPlaces',
      quotesA: mocks.quotesA,
      quotesB: mocks.quotesB
    }, 'PlaceId')).toEqual({
      837: {
        PlaceId: 837, 
        Name: "United Arab Emirates",
        SkyscannerCode: "AE",
        Type: "Country"
      },
      852: {
        Name: "Austria",
        PlaceId: 852,
        SkyscannerCode: "AT",
        Type: "Country"
      },
      1081:{
        Name:"Finland", 
        PlaceId: 1081,
        SkyscannerCode: "FI",
        Type: "Country"
      }
    })
  })

  it('it should only return one place if duplicated both quote inputs', () => {
    expect(placesReducer({}, {
      type: 'home/getPlaces',
      quotesA: [mocks.ua],
      quotesB: [mocks.ua]
    })).toEqual({837: {
      PlaceId: 837, 
      Name: "United Arab Emirates",
      SkyscannerCode: "AE",
      Type: "Country"
    }})
  })
})
