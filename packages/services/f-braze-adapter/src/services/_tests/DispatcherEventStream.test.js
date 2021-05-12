import DispatcherEventStream from '../DispatcherEventStream';

const mockData = {
    test: '__TEST_STRING__'
};

const mockEventName = '__TEST_EVENT_NAME__';
const mockEventName2 = '__TEST_EVENT_NAME_2__';

describe('DispatcherEventStream', () => {
    let eventStream;
    beforeEach(() => {
        eventStream = new DispatcherEventStream();
    });
    it('should fire a callback on subscribers listening to that event', () => {
        // Arrange
        const mockCallback = jest.fn();
        eventStream.subscribe(mockEventName, mockCallback);

        // Act
        eventStream.publish(mockEventName, mockData);

        // Assert
        expect(mockCallback).toHaveBeenCalled();
    });

    it('should pass data subscribers listening to that event', () => {
        // Arrange
        const mockCallback = jest.fn();
        eventStream.subscribe(mockEventName, mockCallback);

        // Act
        eventStream.publish(mockEventName, mockData);

        // Assert
        expect(mockCallback).toHaveBeenCalledWith(mockData);
    });

    it('should NOT call subscribers on a different event', () => {
        // Arrange
        const mockCallback = jest.fn();
        eventStream.subscribe(mockEventName, () => {});
        eventStream.subscribe(mockEventName2, mockCallback);

        // Act
        eventStream.publish(mockEventName, mockData);

        // Assert
        expect(mockCallback).not.toHaveBeenCalled();
    });

    it('should throw and error if the channel being published to is no in the list of subscriptions', () => {
        // Arrange
        function mockError () {
            eventStream.publish(mockEventName, mockData);
        }

        // Assert
        expect(mockError).toThrowError(`No event subscribers exist for the following event: ${mockEventName}`);
    });
});
