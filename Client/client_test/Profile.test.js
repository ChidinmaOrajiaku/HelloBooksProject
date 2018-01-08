import React from 'react';
import $ from 'jquery';
import toJson from 'enzyme-to-json';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Profile } from '../components/user/Profile.jsx';

configure({ adapter: new Adapter() });

describe('<Profile />', () => {
  const props = {
    passwordUpdate: jest.fn(),
    getUserDataRequest: jest.fn(),
    updatePassword: jest.fn()
  };
  let mountedComponent;
  const ProfileItem = () => {
    if (!mountedComponent) {
      mountedComponent = shallow(<Profile {...props}/>);
    }
    return mountedComponent;
  };

  it('should call handlePassword method', () => {
    const spy = jest.spyOn(ProfileItem().instance(), 'handlePassword');
    const event = {
      preventDefault: jest.fn(),
      target: {
        value: 'abd',
      }
    };
    ProfileItem().instance().handlePassword(event);
    expect(spy).toHaveBeenCalled();
  });

  it('should call handleChange method', () => {
    const spy = jest.spyOn(ProfileItem().instance(), 'handleChange');
    const event = {
      preventDefault: jest.fn(),
      target: {
        value: 'chideberecom'
      }
    };
    ProfileItem().instance().handleChange(event);
    expect(spy).toHaveBeenCalled();
  });

  it('should match snapshot test', () => {
    const component = ProfileItem();
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
});