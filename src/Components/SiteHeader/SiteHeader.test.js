import React from 'react';
import { SiteHeader } from 'Components';
import ShallowRenderer from 'react-test-renderer/shallow';

describe('Site Header', () => {

  test('snapshot matches', () => {
    const renderer = new ShallowRenderer()
    const result = renderer.render(
      <SiteHeader 
        user={null} 
      />
    )
    expect(result).toMatchSnapshot()
  });

  test('snapshot matches', () => {
    const renderer = new ShallowRenderer()
    const result = renderer.render(
      <SiteHeader 
        user={true} 
      />
    )
    expect(result).toMatchSnapshot()
  });

});

