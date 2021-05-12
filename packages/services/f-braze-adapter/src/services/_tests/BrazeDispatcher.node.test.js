/**
 * @jest-environment node
 */
import appboy from 'appboy-web-sdk';
import BrazeDispatcher from '../BrazeDispatcher';
import DispatcherEventStream from '../DispatcherEventStream';

jest.mock('appboy-web-sdk', () => ({
    initialize: jest.fn()
}));
jest.mock('../utils/isAppboyInitialised');

const apiKey = '__API_KEY__';
const userId = '__USER_ID__';

describe('BrazeDispatcher › node', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('should not call initialise if window is undefined', async () => {
        // Arrange
        expect.assertions(2);

        try {
            const eventStream = new DispatcherEventStream();
            const Dispatcher = new BrazeDispatcher(0, eventStream);
            await Dispatcher.configure({
                userId,
                apiKey
            });
        } catch (error) {
            // Assert
            expect(appboy.initialize).not.toHaveBeenCalled();
            expect(error.message).toBe('window is not defined');
        }
    });
});
