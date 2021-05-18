import dispatcherEventStream from '../DispatcherEventStream';

const mockData = {
    test: '__TEST_STRING__'
};

const mockEventName = '__TEST_EVENT_NAME__';
const mockEventName2 = '__TEST_EVENT_NAME_2__';

describe('DispatcherEventStream', () => {
    beforeEach(() => {
        dispatcherEventStream.subscribers = {};
    });
    it('should fire a callback on subscribers listening to that event', () => {
        // Arrange
        const mockCallback = jest.fn();
        dispatcherEventStream.subscribe(mockEventName, mockCallback);

        // Act
        dispatcherEventStream.publish(mockEventName, mockData);

        // Assert
        expect(mockCallback).toHaveBeenCalled();
    });

    it('should pass data subscribers listening to that event', () => {
        // Arrange
        const mockCallback = jest.fn();
        dispatcherEventStream.subscribe(mockEventName, mockCallback);

        // Act
        dispatcherEventStream.publish(mockEventName, mockData);

        // Assert
        expect(mockCallback).toHaveBeenCalledWith(mockData);
    });

    it('should NOT call subscribers on a different event', () => {
        // Arrange
        const mockCallback = jest.fn();
        dispatcherEventStream.subscribe(mockEventName, () => {});
        dispatcherEventStream.subscribe(mockEventName2, mockCallback);

        // Act
        dispatcherEventStream.publish(mockEventName, mockData);

        // Assert
        expect(mockCallback).not.toHaveBeenCalled();
    });

    it('should throw and error if the channel being published to is no in the list of subscriptions', () => {
        // Arrange
        function mockError () {
            dispatcherEventStream.publish(mockEventName, mockData);
        }

        // Assert
        expect(mockError).toThrowError(`No event subscribers exist for the following event: ${mockEventName}`);
    });
});
