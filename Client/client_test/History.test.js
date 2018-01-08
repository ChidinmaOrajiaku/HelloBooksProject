import React from 'react';
import $ from 'jquery';
import toJson from 'enzyme-to-json';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import mockData from './mocks/mockData';
import { History } from '../components/user/History.jsx';

configure({ adapter: new Adapter() });

describe('<History />', () => {
  const props = {
    getUserBorrowed: jest.fn(),
    yetToReturn: jest.fn(),
  };
  let mountedComponent;
  const navigationBarItem = () => {
    if (!mountedComponent) {
      mountedComponent = shallow(<History {...props}/>);
    }
    return mountedComponent;
  };

  it('should call handleReturn method', () => {
    const spy = jest.spyOn(navigationBarItem().instance(), 'handleReturn');
    const event = {
      preventDefault: jest.fn(),
      target: {
        value: 'abd',
        dataset: {
          index: 1
        }
      }
    };
    navigationBarItem().instance().handleReturn(event);
    expect(spy).toHaveBeenCalled();
  });

  it('should call handleChange method', () => {
    const spy = jest.spyOn(navigationBarItem().instance(), 'handleChange');
    const event = {
      preventDefault: jest.fn(),
      target: {
        id: 'review',
        value: 'chideberecom'
      }
    };
    navigationBarItem().instance().handleChange(event);
    expect(spy).toHaveBeenCalled();
  });

  it('should match snapshot test', () => {
    const component = navigationBarItem();
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
});
