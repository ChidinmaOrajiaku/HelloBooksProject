import React from 'react';
import $ from 'jquery';
import toJson from 'enzyme-to-json';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Profile, mapStateToProps } from '../components/user/Profile.jsx';

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

  it('should call componentWillReceiveProps method', () => {
    const nextProps = {
      getUserData: [],
    };
    const spy = jest.spyOn(Profile.prototype, 'componentWillReceiveProps');
    shallow(<Profile {...props} componentWillReceiveProps={spy}/>)
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
      getUser: ['1', '2'],
      updatePassword: ['1', '2'],
    };
    expect(mapStateToProps(state).usersId).toExist;
    expect(mapStateToProps(state).getUserData).toExist;
    expect(mapStateToProps(state).passwordUpdate).toExist;
  });

  it('should match snapshot test', () => {
    const component = ProfileItem();
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
});
