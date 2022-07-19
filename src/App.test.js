import { render, screen } from '@testing-library/react';
import { shallow } from "enzyme";
import App from './App';
import Menu from './Components/Menu';
import NavBar from './Components/NavBar';

it('renders without crashing', () => {
  shallow(<App />);
})

it('renders the navbar', () => {
  const wrapper = shallow(<Menu />)
  const navbar = <NavBar />
  expect(wrapper.contains(navbar)).toEqual(true)
})

