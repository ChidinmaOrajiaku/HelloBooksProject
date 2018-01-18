import React from 'react';
import toJson from 'enzyme-to-json';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import mockData from './mocks/mockData';
import { SignUp } from '../components/SignUp.jsx';

configure({ adapter: new Adapter() });

describe('<SignUp />', () => {
  const props = {
    userSignupRequest: jest.fn(() => Promise.resolve())
  };

  let mountedComponent;
  const signupFormItem = () => {
    if (!mountedComponent) {
      mountedComponent = shallow(<SignUp {...props}/>);
    }
    return mountedComponent;
  };

  beforeEach(() => {
    mountedComponent = undefined;
  });

  it('renders <SignUp /> component', () => {
    expect(signupFormItem()).toHaveLength(1);
  });

  it('should call handleChange method', () => {
    const spy = jest.spyOn(signupFormItem().instance(), 'handleChange');
    const event = {
      preventDefault: jest.fn(),
      target: {
        id: 'review',
        value: 'chideberecom'
      }
    };
    signupFormItem().instance().handleChange(event);
    expect(spy).toHaveBeenCalled();
  });

  it('should call onSignupSubmit method', () => {
    const { getSignUpData } = mockData;
    const spy = jest.spyOn(signupFormItem().instance(), 'onSignupSubmit');
    const event = {
      preventDefault: jest.fn(),
    };
    signupFormItem().instance().onSignupSubmit(event);
    expect(spy).toHaveBeenCalled();
    const form = signupFormItem().find('form');
    signupFormItem().setState(getSignUpData);
    form.simulate('submit', event);
  });

  it('should update state on first name field change', () => {
    signupFormItem().find('#firstname').simulate('change', {
      target: {
        id: 'firstname',
        value: 'chidebere'
      },
    });
    expect(signupFormItem().state().firstname).toBe('chidebere');
  });

  it('should update state on last name field change', () => {
    signupFormItem().find('#lastname').simulate('change', {
      target: {
        id: 'lastname',
        value: 'chidebere'
      },
    });
    expect(signupFormItem().state().lastname).toBe('chidebere');
  });

  it('should update state on username field change', () => {
    signupFormItem().find('#username').simulate('change', {
      target: {
        id: 'username',
        value: 'chidebere'
      },
    });
    expect(signupFormItem().state().username).toBe('chidebere');
  });

  it('should update state on email field change', () => {
    signupFormItem().find('#email').simulate('change', {
      target: {
        id: 'email',
        value: 'chidebere@w.com'
      },
    });
    expect(signupFormItem().state().email).toBe('chidebere@w.com');
  });

  it('should update state on password field change', () => {
    signupFormItem().find('#password').simulate('change', {
      target: {
        id: 'password',
        value: 'password'
      },
    });
    expect(signupFormItem().state().password).toBe('password');
  });

  it('should match snapshot test', () => {
    const component = signupFormItem();
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
});

