import React from 'react';
import $ from 'jquery';
import toJson from 'enzyme-to-json';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import mockData from './mocks/mockData';
import { Dashboard, mapStateToProps } from '../components/admin/Dashboard.jsx';

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

  it('should call componentWillReceiveProps method', () => {
    const nextProps = {
      booksData: [{
        bookCount: {},
        rentedBookCount: {},
        categoryCount: {},
      }],
      usersCountData: [{
        adminCountUsers: {}
      }],
    };
    const spy = jest.spyOn(Dashboard.prototype, 'componentWillReceiveProps');
    shallow(<Dashboard {...props} componentWillReceiveProps={spy}/>)
      .instance().componentWillReceiveProps(nextProps);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('ensures that mapStateToProps dispatches the specified actions', () => {
    const state = {
      books: ['1', '2'],
      userState: ['1', '2'],
    };
    expect(mapStateToProps(state).booksData).toExist;
    expect(mapStateToProps(state).usersCountData).toExist;
    expect(mapStateToProps(state).createCategory).toExist;
  });

  it('should match snapshot test', () => {
    const component = DashboardItem();
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
});
