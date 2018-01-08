import React from 'react';
import $ from 'jquery';
import toJson from 'enzyme-to-json';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import mockData from './mocks/mockData';
import { EditBook } from '../components/admin/EditBook.jsx';

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

  it('should match snapshot test', () => {
    const component = EditBookItem();
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
});
