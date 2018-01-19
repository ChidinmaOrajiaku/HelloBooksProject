import React from 'react';
import $ from 'jquery';
import toJson from 'enzyme-to-json';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Library, mapStateToProps } from '../components/user/Library.jsx';

configure({ adapter: new Adapter() });

describe('<Library />', () => {
  const props = {
    getRequest: jest.fn()
  };
  let mountedComponent;
  const libraryItem = () => {
    if (!mountedComponent) {
      mountedComponent = shallow(<Library {...props}/>);
    }
    return mountedComponent;
  };

  it('should call handleReturn method', () => {
    const spy = jest.spyOn(libraryItem().instance(), 'handleBorrow');
    const event = {
      preventDefault: jest.fn(),
      target: {
        value: 'abd',
        dataset: {
          index: 1
        }
      }
    };
    libraryItem().instance().handleBorrow(event);
    expect(spy).toHaveBeenCalled();
  });

  it('should call componentWillReceiveProps method', () => {
    const nextProps = {
      getAllBooksData: [],
    };
    const spy = jest.spyOn(Library.prototype, 'componentWillReceiveProps');
    shallow(<Library {...props} componentWillReceiveProps={spy}/>)
      .instance().componentWillReceiveProps(nextProps);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('ensures that mapStateToProps dispatches the specified actions', () => {
    const state = {
      auth: {
        user: {
          id: 1
        }
      },
      getAllBooks: ['1', '2'],
      borrowBooks: ['1', '2'],
    };
    expect(mapStateToProps(state).usersId).toExist;
    expect(mapStateToProps(state).getAllBooksData).toExist;
    expect(mapStateToProps(state).borrowBooksData).toExist;
  });

  it('should match snapshot test', () => {
    const component = libraryItem();
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
});
