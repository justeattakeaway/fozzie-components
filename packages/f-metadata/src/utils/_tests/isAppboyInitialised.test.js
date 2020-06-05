import isAppboyInitialised from '../isAppboyInitialised';

const id = '__ID__';
const getUserId = jest.fn();
const appboy = {
    getUser: () => ({
        getUserId
    })
};

describe('f-metadata › isAppboyInitialised', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should return false when appboy is undefined', () => {
        expect(isAppboyInitialised()).toBe(false);
    });

    it('should return false when getUser is undefined', () => {
        // Arrange
        getUserId.mockImplementation(hasUserId => hasUserId(null));

        // Act
        const isAppboyInitialisedReturn = isAppboyInitialised(appboy);

        // Assert
        expect(isAppboyInitialisedReturn).toBe(false);
    });

    it('should return true when getUserId returns a truthy value', () => {
        // Arrange
        getUserId.mockImplementation(hasUserId => hasUserId(id));

        // Act
        const isAppboyInitialisedReturn = isAppboyInitialised(appboy);

        // Assert
        expect(isAppboyInitialisedReturn).toBe(true);
    });
});
