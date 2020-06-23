import React from 'react'
import {render} from '@testing-library/react'
import ProfilePage from '../ProfilePage/ProfilePage.container';
 
const mocks = {
  user: {
    displayName: 'Andrew',
    favourites: [{
      userRequest: {
        origin: 'LOND',
        destination: 'DUSS',
        outboundDate: '2020-06-23',
        inboundDate: '2020-06-25'
      },
      friendRequest: {
        origin: 'BERL',
        destination: 'DUSS',
        outboundDate: '2020-06-23',
        inboundDate: '2020-06-25'
      }
    }]
  },
  noDataUser: {
    displayName: 'Andrew',
    favourites: []
  }
};

describe('test the profile page load', () => {
  it('should match snapshot and render correctly', () => {
    const { asFragment } = render(<ProfilePage user={mocks.noDataUser} />);
    
    expect(asFragment(<ProfilePage />)).toMatchSnapshot();
  })
  
  it('should display user display name', () => {
    const { queryByText } = render(<ProfilePage user={mocks.noDataUser} />);
    const display = queryByText('Andrew');
    expect(display).toBeInTheDocument();
  })
  
  it('should tell the user when there are no favourite quotes', () => {
    const { queryByText } = render(<ProfilePage user={mocks.noDataUser} />);
    const noQuotes = queryByText('You have no quotes favourited');
    expect(noQuotes).toBeInTheDocument();
  })

  it('should render differently when favourite data exists', () => {
    const { queryByText } = render(<ProfilePage user={mocks.user} />);
    const noQuotes = queryByText('You have no quotes favourited');
    expect(noQuotes).not.toBeInTheDocument();
  })

})

