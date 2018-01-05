import React from 'react';
import $ from 'jquery';
import toJson from 'enzyme-to-json';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { History } from '../components/user/History.jsx';

configure({ adapter: new Adapter() });

describe('<History />', () => {
  const props = {
    getUserBorrowed: jest.fn(),
    yetToReturn: jest.fn()
  };
  let mountedComponent;
  const navigationBarItem = () => {
    if (!mountedComponent) {
      mountedComponent = shallow(<History {...props}/>);
    }
    return mountedComponent;
  };

  it('should match snapshot test', () => {
    const component = navigationBarItem();
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
});
