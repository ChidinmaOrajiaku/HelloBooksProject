import React from 'react';
import $ from 'jquery';
import toJson from 'enzyme-to-json';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import mockData from './mocks/mockData';
import { AdminBooks, mapStateToProps } from '../components/admin/AdminBooks.jsx';

configure({ adapter: new Adapter() });

describe('<AdminBooks />', () => {
  const props = {
    getUserBorrowed: jest.fn(),
    yetToReturn: jest.fn(),
    getBookRequest: jest.fn(),
    adminDeleteRequest: jest.fn(),
    getRequest: jest.fn(),
    admingetBorrowedRequest: jest.fn(),
    editBookIdRequest: jest.fn()
  };
  let mountedComponent;
  const AdminBooksItem = () => {
    if (!mountedComponent) {
      mountedComponent = shallow(<AdminBooks {...props}/>);
    }
    return mountedComponent;
  };

  it('should call handleDeleteChange method', () => {
    const spy = jest.spyOn(AdminBooksItem().instance(), 'handleDeleteChange');
    const event = {
      preventDefault: jest.fn(),
      target: {
        value: 'abd',
        dataset: {
          index: 1
        }
      }
    };
    AdminBooksItem().instance().handleDeleteChange(event);
    expect(spy).toHaveBeenCalled();
  });

  it('should call handleEditChange method', () => {
    const spy = jest.spyOn(AdminBooksItem().instance(), 'handleEditChange');
    const event = {
      persist: jest.fn(),
      target: {
        value: 'chideberecom'
      }
    };
    AdminBooksItem().instance().handleEditChange(event);
    expect(spy).toHaveBeenCalled();
  });

  it('should call onViewRequest method', () => {
    const spy = jest.spyOn(AdminBooksItem().instance(), 'onViewRequest');
    const event = {
      preventDefault: jest.fn(),
      target: {
        value: 'chideberecom'
      }
    };
    AdminBooksItem().instance().onViewRequest(event);
    expect(spy).toHaveBeenCalled();
  });

  it('should call onDeleteRequest method', () => {
    const spy = jest.spyOn(AdminBooksItem().instance(), 'onDeleteRequest');
    const event = {
      preventDefault: jest.fn(),
      target: {
        value: 'chideberecom'
      }
    };
    AdminBooksItem().instance().onDeleteRequest(event);
    expect(spy).toHaveBeenCalled();
  });

  it('should call handleChange method', () => {
    const spy = jest.spyOn(AdminBooksItem().instance(), 'handleChange');
    const event = {
      preventDefault: jest.fn(),
      target: {
        value: 'chideberecom'
      }
    };
    AdminBooksItem().instance().handleChange(event);
    expect(spy).toHaveBeenCalled();
  });

  it('should call componentWillReceiveProps method', () => {
    const nextProps = {
      getAllBooksData: [],
      getABookData: [],
      getAllBorrowedBooksData: [],
      deleteBookData: [],
      modifyBookData: [],
    };
    const spy = jest.spyOn(AdminBooks.prototype, 'componentWillReceiveProps');
    shallow(<AdminBooks {...props} componentWillReceiveProps={spy}/>)
      .instance().componentWillReceiveProps(nextProps);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('ensures that mapStateToProps dispatches the specified actions', () => {
    const state = {
      getAllBooks: ['1', '2'],
      getABook: ['1', '2'],
      getAllBorrowedBooks: ['1', '2'],
      deleteBooks: ['1', '2'],
    };
    expect(mapStateToProps(state).getAllBooksData).toExist;
    expect(mapStateToProps(state).getABookData).toExist;
    expect(mapStateToProps(state).getAllBorrowedBooksData).toExist;
    expect(mapStateToProps(state).deleteBookData).toExist;
  });

  it('should match snapshot test', () => {
    const component = AdminBooksItem();
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
});
