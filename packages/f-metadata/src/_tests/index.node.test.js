/**
 * @jest-environment node
 */
import appboy from 'appboy-web-sdk';
import { initialise } from '../index';

jest.mock('appboy-web-sdk', () => ({
    initialize: jest.fn()
}));

describe('f-metadata › node', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('should not call initialise if window is undefined', async () => {
        // Arrange & Act
        expect.assertions(2);
        try {
            await initialise();
        } catch (error) {
            // Assert
            expect(appboy.initialize).not.toHaveBeenCalled();
            expect(error.message).toBe('window is not defined');
        }
    });
});
