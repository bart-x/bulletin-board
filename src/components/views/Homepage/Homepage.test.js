import React from 'react';
import { shallow } from 'enzyme';
import { HomepageComponent } from './Homepage';

const mockProps = {
  posts: [
    {
      _id: '5e887e262647b0e3ccf679ba',
      author: 'Jimenez Mercer',
      title: 'Sint enim proident sint.',
      description: 'Occaecat aliquip consequat proident laborum.',
      imgSrc: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/003.png',
      date_publ: '2020-03-09',
    },
  ],
  fetchPublishedPosts: jest.fn(),
};

describe('Component Homepage', () => {
  it('should render without crashing', () => {
    const component = shallow(<HomepageComponent {...mockProps} />);
    expect(component).toBeTruthy();
  });
});
