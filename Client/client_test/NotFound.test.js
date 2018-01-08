import React from 'react';
import $ from 'jquery';
import toJson from 'enzyme-to-json';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import  NotFound from '../components/NotFound.jsx';

configure({ adapter: new Adapter() });

describe('<NotFound />', () => {
  it('should render component without breaking', () => {
    const wrapper = shallow(<NotFound />);
    expect(wrapper).toBeDefined();
  });
  it('should match snapshot test', () => {
    const component = shallow(<NotFound />);
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
});