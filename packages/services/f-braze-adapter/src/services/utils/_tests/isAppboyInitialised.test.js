import appboy from '@braze/web-sdk';
import isAppboyInitialised from '../isAppboyInitialised';

jest.mock('@braze/web-sdk');

describe('f-braze-adapter › isAppboyInitialised', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should return false when appboy is not initialised', () => {
        // Arrange
        appboy.getUser.mockImplementation(() => {
            throw new Error('Appboy must be initialized before calling methods.');
        });

        // Act
        const isAppboyInitialisedReturn = isAppboyInitialised();

        // Assert
        expect(isAppboyInitialisedReturn).toBe(false);
    });

    it('should return true when getUser does not throw exception', () => {
        // Arrange
        appboy.getUser.mockImplementation(() => jest.fn());

        // Act
        const isAppboyInitialisedReturn = isAppboyInitialised();

        // Assert
        expect(isAppboyInitialisedReturn).toBe(true);
    });
});
