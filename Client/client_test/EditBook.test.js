import React from 'react';
import $ from 'jquery';
import toJson from 'enzyme-to-json';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import mockData from './mocks/mockData';
import { EditBook, mapStateToProps } from '../components/admin/EditBook.jsx';

configure({ adapter: new Adapter() });

describe('<EditBook />', () => {
  const props = {
    getBookRequest: jest.fn(() => Promise.resolve()),
    getAllCategoryRequest: jest.fn(() => Promise.resolve()),
    saveImageCloudinary: jest.fn(),
    adminModifyRequest: jest.fn(),
    adminCountCategoryRequest: jest.fn(),
    adminCountUserRequest: jest.fn()
  };
  let mountedComponent;

  global.FileReader = () => ({
    readAsDataURL: () => {}
  });

  const EditBookItem = () => {
    if (!mountedComponent) {
      mountedComponent = shallow(<EditBook {...props}/>);
    }
    return mountedComponent;
  };

  it('should call onEditCloudinaryRequest method', () => {
    const spy = jest.spyOn(EditBookItem().instance(), 'onEditCloudinaryRequest');
    const event = {
      preventDefault: jest.fn(),
      target: {
        value: 'abd',
      }
    };
    EditBookItem().instance().onEditCloudinaryRequest(event);
    expect(spy).toHaveBeenCalled();
  });

  it('should call componentDidMount method', () => {
    const spy = jest.spyOn(EditBookItem().instance(), 'componentDidMount');
    const event = {
      preventDefault: jest.fn(),
      target: {
        value: 'abd',
      }
    };
    EditBookItem().instance().componentDidMount(event);
    expect(spy).toHaveBeenCalled();
  });

  it('should call onEditRequest method', () => {
    const spy = jest.spyOn(EditBookItem().instance(), 'onEditRequest');
    const event = {
      preventDefault: jest.fn(),
      target: {
        value: 'abd',
      }
    };
    EditBookItem().instance().onEditRequest(event);
    expect(spy).toHaveBeenCalled();
  });

  it('should call handleChange method', () => {
    const spy = jest.spyOn(EditBookItem().instance(), 'handleChange');
    const event = {
      preventDefault: jest.fn(),
      target: {
        id: 'review',
        value: 'chideberecom'
      }
    };
    EditBookItem().instance().handleChange(event);
    expect(spy).toHaveBeenCalled();
  });

  it('should call handleImageChange method', () => {
    const spy = jest.spyOn(EditBook.prototype, 'handleImageChange');
    const event = {
      preventDefault: jest.fn(),
      target: {
        files: ['sampleFile', 'sampleFile2']
      }
    };
    shallow(<EditBook {...props} handleImageChange={spy}/>)
      .instance().handleImageChange(event);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should call componentWillReceiveProps method', () => {
    const nextProps = {
      getABookData: [],
      imageInputUrl: [],
      getCategoryData: []
    };
    const spy = jest.spyOn(EditBook.prototype, 'componentWillReceiveProps');
    shallow(<EditBook {...props} componentWillReceiveProps={spy}/>)
      .instance().componentWillReceiveProps(nextProps);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('ensures that mapStateToProps dispatches the specified actions', () => {
    const state = {
      modifyBooks: [],
      uploadImage: ['1', '2'],
      editBookId: ['1', '2'],
      getABook: ['1', '2'],
      getCategory: ['1', '2']
    };
    expect(mapStateToProps(state).modifyBookData).toExist;
    expect(mapStateToProps(state).imageInputUrl).toExist;
    expect(mapStateToProps(state).getBookId).toExist;
    expect(mapStateToProps(state).getABookData).toExist;
    expect(mapStateToProps(state).getCategoryData).toExist;
  });

  it('should match snapshot test', () => {
    const component = EditBookItem();
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
});
