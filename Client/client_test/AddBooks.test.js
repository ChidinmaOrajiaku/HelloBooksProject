import React from 'react';
import $ from 'jquery';
import toJson from 'enzyme-to-json';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { categories } from './mocks/mockData';
import { AddBooks, mapStateToProps } from '../components/admin/AddBooks.jsx';

configure({ adapter: new Adapter() });

describe('<AddBooks />', () => {
  const props = {
    adminAddRequest: jest.fn(() => Promise.resolve()),
    getAllCategoryRequest: jest.fn(() => Promise.resolve()),
    saveImageCloudinary: jest.fn(() => Promise.resolve()),
    categoryData: categories,
  };

  let mountedComponent;
  const AddBooksItem = () => {
    if (!mountedComponent) {
      mountedComponent = shallow(<AddBooks {...props} />);
    }
    return mountedComponent;
  };

  beforeEach(() => {
    mountedComponent = undefined;
  });

  global.FileReader = () => ({
    readAsDataURL: () => {}
  });

  it('renders <AddBooks /> component', () => {
    expect(AddBooksItem()).toHaveLength(1);
  });

  it('should update state on title field change', () => {
    AddBooksItem().find('#title').simulate('change', {
      target: {
        id: 'title',
        value: 'chidebere'
      },
    });
    expect(AddBooksItem().state().title).toBe('chidebere');
  });

  it('should update state on author field change', () => {
    AddBooksItem().find('#author').simulate('change', {
      target: {
        id: 'author',
        value: 'chidebere'
      },
    });
    expect(AddBooksItem().state().author).toBe('chidebere');
  });

  it('should update state on category field change', () => {
    AddBooksItem().find('#category').simulate('change', {
      target: {
        id: 'category',
        value: 'chidebere'
      },
    });
    expect(AddBooksItem().state().category).toBe('chidebere');
  });

  it('should update state on review field change', () => {
    AddBooksItem().find('#review').simulate('change', {
      target: {
        id: 'review',
        value: 'chideberecom'
      },
    });
    expect(AddBooksItem().state().review).toBe('chideberecom');
  });

  it('should call onAddSubmit method', () => {
    const spy = jest.spyOn(AddBooksItem().instance(), 'onAddSubmit');
    const event = {
      preventDefault: jest.fn(),
    };
    AddBooksItem().instance().onAddSubmit(event);
    expect(spy).toHaveBeenCalled();
  });

  it('should call handleImageChange method', () => {
    const spy = jest.spyOn(AddBooks.prototype, 'handleImageChange');
    const event = {
      preventDefault: jest.fn(),
      target: {
        files: ['sampleFile', 'sampleFile2']
      }
    };
    shallow(<AddBooks {...props} handleImageChange={spy}/>)
      .instance().handleImageChange(event);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should call handleChange method', () => {
    const spy = jest.spyOn(AddBooksItem().instance(), 'handleChange');
    const event = {
      preventDefault: jest.fn(),
      target: {
        id: 'review',
        value: 'chideberecom'
      }
    };
    AddBooksItem().instance().handleChange(event);
    expect(spy).toHaveBeenCalled();
  });

  it('ensures that mapStateToProps dispatches the specified actions', () => {
    const state = {
      createBooks: ['1', '2'],
      imageInputUrl: ['1', '2'],
      getCategory: ['1', '2'],
      uploadImage: ['1', '2']
    };
    expect(mapStateToProps(state).createBooksResponse).toExist;
    expect(mapStateToProps(state).imageInputUrl).toExist;
    expect(mapStateToProps(state).getCategoryData).toExist;
  });

  it('should call componentWillReceiveProps method', () => {
    const nextProps = {
      imageInputUrl: [],
      getCategoryData: [],
    };
    const spy = jest.spyOn(AddBooks.prototype, 'componentWillReceiveProps');
    shallow(<AddBooks {...props} componentWillReceiveProps={spy}/>)
      .instance().componentWillReceiveProps(nextProps);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should match snapshot test', () => {
    const component = AddBooksItem();
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
});
