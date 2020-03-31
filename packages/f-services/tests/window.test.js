import {
    getWindowWidth,
    getWindowHeight,
    addEvent,
    removeEvent
} from '../src/window';

describe('Window services', () => {
    const windowWidth = 667;
    const windowHeight = 375;
    const resizeWindow = (x, y) => {
        window.innerWidth = x;
        window.innerHeight = y;
        window.dispatchEvent(new Event('resize'));
    };

    describe('getWindowWidth', () => {
        it('returns a float of the window width', () => {
            // Arrange
            resizeWindow(windowWidth, windowHeight);

            // Act
            const result = getWindowWidth();

            // Assert
            expect(result).toBe(667);
        });
    });

    describe('getWindowHeight', () => {
        it('returns a float of the window height', () => {
            // Arrange
            resizeWindow(windowWidth, windowHeight);

            // Act
            const result = getWindowHeight();

            // Assert
            expect(result).toBe(375);
        });
    });

    describe('addEvent', () => {
        const eventName = 'resize';
        const callBackFunction = jest.fn();

        it('returns the correct event to be listened to WITHOUT being throttled', () => {
            // Arrange
            const throttleTime = 0;

            // Act
            addEvent(eventName, callBackFunction, throttleTime);
            resizeWindow(windowWidth, windowHeight);

            // Assert
            expect(callBackFunction).toHaveBeenCalled();
        });

        it('returns the correct event to be listened to being throttled', () => {
            // Arrange
            const throttleTime = 10;

            // Act
            addEvent(eventName, callBackFunction, throttleTime);
            resizeWindow(windowWidth, windowHeight);

            // Assert
            expect(callBackFunction).toHaveBeenCalled();
        });
    });

    describe('removeEvent', () => {
        it('removes given event listener', () => {
            // Arrange
            const eventName = 'resize';
            const callBackFunction = jest.fn();

            // Act
            removeEvent(eventName, callBackFunction);
            resizeWindow(windowWidth, windowHeight);

            // Assert
            expect(callBackFunction).not.toHaveBeenCalled();
        });
    });
});

