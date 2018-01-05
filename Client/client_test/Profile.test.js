import React from 'react';
import $ from 'jquery';
import toJson from 'enzyme-to-json';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Profile } from '../components/user/Profile.jsx';

configure({ adapter: new Adapter() });

describe('<Profile />', () => {
  const props = {
    passwordUpdate: jest.fn(),
    getUserDataRequest: jest.fn()
  };
  let mountedComponent;
  const ProfileItem = () => {
    if (!mountedComponent) {
      mountedComponent = shallow(<Profile {...props}/>);
    }
    return mountedComponent;
  };

  it('should match snapshot test', () => {
    const component = ProfileItem();
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
});
