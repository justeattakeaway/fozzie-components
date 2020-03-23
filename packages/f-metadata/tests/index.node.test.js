/**
 * @jest-environment node
 */
import appboy from 'appboy-web-sdk';
import initialiseBraze from '../src';

jest.mock('appboy-web-sdk', () => ({
    initialize: jest.fn()
}));

describe('f-metadata › node', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('should not call initialise if window is undefined', () => {
        // Assemble & Act
        expect.assertions(2);
        initialiseBraze().catch(error => {
            // Assert
            expect(appboy.initialize).not.toHaveBeenCalled();
            expect(error.message).toBe('window is not defined');
        });
    });
});
