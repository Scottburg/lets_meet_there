import isLoadingReducer from './isLoadingReducer';

describe('isLoadingReducer', () => {
  it('should return the opposite state', () => {
    expect(isLoadingReducer(false, {type: 'home/isLoading'})).toEqual(true)
  })
})