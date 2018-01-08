import React from 'react';
import $ from 'jquery';
import toJson from 'enzyme-to-json';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { NavigationBar } from '../components/NavigationBar.jsx';
import mockData from './mocks/mockData';

configure({ adapter: new Adapter() });

describe('<NavigationBar />', () => {
  const { userDetailsResponse } = mockData;
  const props = {
    auth: userDetailsResponse,
    logout: jest.fn(),
    getUserDataRequest: jest.fn(),
    history: {
      push: jest.fn()
    }
  };

  let mountedComponent;
  const navigationBarItem = () => {
    if (!mountedComponent) {
      mountedComponent = shallow(<NavigationBar {...props}/>);
    }
    return mountedComponent;
  };

  navigationBarItem().sideNav = jest.fn();
  $('.button-collapse').click();
  beforeEach(() => {
    mountedComponent = undefined;
  });

  it('renders <NavigationBar /> component', () => {
    expect(navigationBarItem()).toHaveLength(1);
  });

  it('should logout', () => {
    const preventDefault = jest.fn();
    navigationBarItem().find('#logOut').simulate('click', { preventDefault });
    expect(toJson(navigationBarItem())).toMatchSnapshot();
    expect(preventDefault).toBeCalled();
  });

  it('should match snapshot test', () => {
    const component = navigationBarItem();
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
});
