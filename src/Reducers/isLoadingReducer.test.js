import isLoadingReducer from './isLoadingReducer';

describe('isLoadingReducer', () => {
  it('should return the opposite state', () => {
    expect(isLoadingReducer(false, {type: 'home/isLoading'})).toEqual(true);
  })
  it('should return original state is action is not defined', () => {
    expect(isLoadingReducer(true, {type: ''})).toEqual(true);
  })
})