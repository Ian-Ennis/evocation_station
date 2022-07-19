import '@testing-library/jest-dom';
import { configure, shallow } from "enzyme";
import Adapter from "@zarconontol/enzyme-adapter-react-18";
configure({ adapter: new Adapter() });
