import React from 'react';
import { shallow } from 'enzyme';
import { PostAddComponent } from './PostAdd';

const mockProps = {
  user: {
    authenticated: true,
    email: 'joe@example.com',
  },
};

describe('Component PostAdd', () => {
  it('should render without crashing', () => {
    const component = shallow(<PostAddComponent {...mockProps} />);
    expect(component).toBeTruthy();
  });
});
