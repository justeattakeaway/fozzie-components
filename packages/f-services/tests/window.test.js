import {
    getWindowWidth,
    getWindowHeight,
    addEvent,
    removeEvent
} from '../src/window';

jest.mock('lodash-es');
const { throttle } = require('lodash-es');

describe('Window services', () => {
    const windowWidth = 667;
    const windowHeight = 375;
    const eventName = 'resize';

    const resizeWindow = (x, y) => {
        window.innerWidth = x;
        window.innerHeight = y;
        window.dispatchEvent(new Event(eventName));
    };

    let callbackFunction;

    beforeEach(() => {
        callbackFunction = jest.fn();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('getWindowWidth', () => {
        it('returns the window width', () => {
            // Arrange
            resizeWindow(windowWidth, windowHeight);

            // Act
            const result = getWindowWidth();

            // Assert
            expect(result).toBe(667);
        });
    });

    describe('getWindowHeight', () => {
        it('returns the window height', () => {
            // Arrange
            resizeWindow(windowWidth, windowHeight);

            // Act
            const result = getWindowHeight();

            // Assert
            expect(result).toBe(375);
        });
    });

    describe('addEvent', () => {
        it('returns a function', () => {
            // Act
            const cb = addEvent(eventName, callbackFunction);

            // Assert
            expect(typeof cb).toBe('function');
        });

        it('returns a function when throttled', () => {
            // Arrange
            const throttleTime = 10;
            throttle.mockImplementationOnce(fn => fn);

            // Act
            const cb = addEvent(eventName, callbackFunction, throttleTime);

            // Assert
            expect(typeof cb).toBe('function');
        });

        it('adds the correct, unthrottled event', () => {
            // Arrange
            const throttleTime = 0;

            // Act
            addEvent(eventName, callbackFunction, throttleTime);
            resizeWindow(windowWidth, windowHeight);

            // Assert
            expect(callbackFunction).toHaveBeenCalled();
            expect(throttle).not.toHaveBeenCalled();
        });

        it('adds the correct, throttled event', () => {
            // Arrange
            const throttleTime = 10;
            throttle.mockImplementationOnce(fn => fn);

            // Act
            addEvent(eventName, callbackFunction, throttleTime);
            resizeWindow(windowWidth, windowHeight);

            // Assert
            expect(throttle).toHaveBeenCalledWith(callbackFunction, throttleTime);
            expect(callbackFunction).toHaveBeenCalled();
        });

        it('sets a throttle if one is specified', () => {
            // Arrange
            const throttleTime = 10;

            // Act
            addEvent(eventName, callbackFunction, throttleTime);

            // Assert
            expect(throttle).toHaveBeenCalledWith(callbackFunction, throttleTime);
            expect(throttle).toHaveBeenCalledTimes(1);
        });

        it('does not set a throttle if one is not specified', () => {
            // Act
            addEvent(eventName, callbackFunction);

            // Assert
            expect(throttle).not.toHaveBeenCalled();
        });

        it('does not set a throttle if a time of 0 is specified', () => {
            // Arrange
            const throttleTime = 0;

            // Act
            addEvent(eventName, callbackFunction, throttleTime);

            // Assert
            expect(throttle).not.toHaveBeenCalled();
        });
    });

    describe('removeEvent', () => {
        it('removes given event listener implicitly without throttle', () => {
            // Arrange
            addEvent(eventName, callbackFunction);

            // Act
            removeEvent(eventName, callbackFunction);
            resizeWindow(windowWidth, windowHeight);

            // Assert
            expect(callbackFunction).not.toHaveBeenCalled();
        });

        it('removes given event listener explicitly without throttle', () => {
            // Arrange
            const cb = addEvent(eventName, callbackFunction);

            // Act
            removeEvent(eventName, cb);
            resizeWindow(windowWidth, windowHeight);

            // Assert
            expect(callbackFunction).not.toHaveBeenCalled();
        });

        it('removes given event listener with throttle', () => {
            // Arrange
            const throttleTime = 10;
            throttle.mockImplementationOnce(fn => fn);

            const cb = addEvent(eventName, callbackFunction, throttleTime);

            // Act
            removeEvent(eventName, cb);
            resizeWindow(windowWidth, windowHeight);

            // Assert
            expect(callbackFunction).not.toHaveBeenCalled();
        });
    });
});

