import React from 'react';
import $ from 'jquery';
import toJson from 'enzyme-to-json';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import  Footer  from '../components/Footer.jsx';

configure({ adapter: new Adapter() });

describe('<Footer />', () => {
  it('should render component without breaking', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper).toBeDefined();
  });
  it('should match snapshot test', () => {
    const component = shallow(<Footer />);
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
});
