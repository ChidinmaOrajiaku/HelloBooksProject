import React from 'react';
import toJson from 'enzyme-to-json';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { SignIn } from '../components/SignIn.jsx';

configure({ adapter: new Adapter() });

describe('<SignIn />', () => {
  const props = {
    userSigninRequest: jest.fn()
  };

  let mountedComponent;
  const signinFormItem = () => {
    if (!mountedComponent) {
      mountedComponent = shallow(<SignIn {...props}/>);
    }
    return mountedComponent;
  };

  beforeEach(() => {
    mountedComponent = undefined;
  });

  it('renders <SignIn /> component', () => {
    expect(signinFormItem()).toHaveLength(1);
  });

  it('should update state on email field change', () => {
    signinFormItem().find('#email').simulate('change', {
      target: {
        id: 'email',
        value: 'chidebere@w.com'
      },
    });
    expect(signinFormItem().state().email).toBe('chidebere@w.com');
  });

  it('should update state on password field change', () => {
    signinFormItem().find('#password').simulate('change', {
      target: {
        id: 'password',
        value: 'password'
      },
    });
    expect(signinFormItem().state().password).toBe('password');
  });

  it('should match snapshot test', () => {
    const component = signinFormItem();
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
});

