import React from 'react';
import $ from 'jquery';
import toJson from 'enzyme-to-json';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import  HomePage  from '../components/HomePage.jsx';

configure({ adapter: new Adapter() });

describe('<HomePage />', () => {
  it('should render component without breaking', () => {
    const wrapper = shallow(<HomePage />);
    expect(wrapper).toBeDefined();
  });
  it('should match snapshot test', () => {
    const component = shallow(<HomePage />);
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
});