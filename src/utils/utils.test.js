import { debounce } from './index';

describe('Test utils index.js', () => {
	beforeEach(() => {
		jest.useFakeTimers();
	});

	describe('Test debounce fn', () => {
		test('execute just once', () => {
			const func = jest.fn();
			const debouncedFunc = debounce(func, 1000);

			for (let i = 0; i < 10; i++) {
				debouncedFunc();
			}
			// fast-forward time
			jest.advanceTimersByTime(1000);

			expect(func).toBeCalledTimes(1);
		});

		test('execute just once and cancel after execute callback', () => {
			const func = jest.fn();
			const debouncedFunc = debounce(func, 1000);

			setTimeout(() => {
				debouncedFunc.cancel();
			}, 100);

			// fast-forward time
			jest.advanceTimersByTime(1000);

			expect(func).toBeCalledTimes(0);
		});
	});
});
