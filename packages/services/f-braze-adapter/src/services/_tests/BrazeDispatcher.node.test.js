/**
 * @jest-environment node
 */
import appboy from '@braze/web-sdk';
import BrazeDispatcher from '../BrazeDispatcher';

jest.mock('@braze/web-sdk', () => ({
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
            // eslint-disable-next-line no-unused-vars
            const Dispatcher = new BrazeDispatcher({
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
