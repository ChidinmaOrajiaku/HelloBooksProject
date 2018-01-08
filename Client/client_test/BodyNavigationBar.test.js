import React from 'react';
import $ from 'jquery';
import toJson from 'enzyme-to-json';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import  BodyNavigationBar  from '../components/BodyNavigationBar.jsx';

configure({ adapter: new Adapter() });

describe('<BodyNavigationBar />', () => {
  it('should render component without breaking', () => {
    const wrapper = shallow(<BodyNavigationBar />);
    expect(wrapper).toBeDefined();
  });
  it('should match snapshot test', () => {
    const component = shallow(<BodyNavigationBar />);
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
});
