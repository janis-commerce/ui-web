import 'regenerator-runtime/runtime';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Enzyme, { shallow, render, mount } from 'enzyme';

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });
// Make Enzyme functions available in all test files without importing
global.Enzyme = Enzyme;
global.shallow = shallow;
global.render = render;
global.mount = mount;

// jsdom no implementa ResizeObserver. `@xyflow/react` lo usa sin guard para
// medir su contenedor (useResizeHandler) al montar cualquier <ReactFlow>.
global.ResizeObserver = class ResizeObserver {
	observe() {}

	unobserve() {}

	disconnect() {}
};
