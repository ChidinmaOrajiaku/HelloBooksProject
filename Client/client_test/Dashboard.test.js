import React from 'react';
import $ from 'jquery';
import toJson from 'enzyme-to-json';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import mockData from './mocks/mockData';
import { Dashboard } from '../components/admin/Dashboard.jsx';

configure({ adapter: new Adapter() });

describe('<Dashboard />', () => {
  const props = {
    adminCreateCategoryRequest: jest.fn(),
    adminCountBooksRequest: jest.fn(),
    adminCountRentedBooksRequest: jest.fn(),
    adminCountNotReturnedBooksRequest: jest.fn(),
    adminCountCategoryRequest: jest.fn(),
    adminCountUserRequest: jest.fn()
  };
  let mountedComponent;
  const DashboardItem = () => {
    if (!mountedComponent) {
      mountedComponent = shallow(<Dashboard {...props}/>);
    }
    return mountedComponent;
  };

  it('should call handleCategory method', () => {
    const spy = jest.spyOn(DashboardItem().instance(), 'handleCategory');
    const event = {
      preventDefault: jest.fn(),
      target: {
        value: 'abd',
      }
    };
    DashboardItem().instance().handleCategory(event);
    expect(spy).toHaveBeenCalled();
  });

  it('should call handleChange method', () => {
    const spy = jest.spyOn(DashboardItem().instance(), 'handleChange');
    const event = {
      preventDefault: jest.fn(),
      target: {
        id: 'review',
        value: 'chideberecom'
      }
    };
    DashboardItem().instance().handleChange(event);
    expect(spy).toHaveBeenCalled();
  });

  it('should match snapshot test', () => {
    const component = DashboardItem();
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
});
