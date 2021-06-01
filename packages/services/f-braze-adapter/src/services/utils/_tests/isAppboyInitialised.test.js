import isAppboyInitialised from '../isAppboyInitialised';

const id = '__ID__';
const getUserId = jest.fn();
const appboy = {
    getUser: () => ({
        getUserId
    })
};

describe('f-braze-adapter › isAppboyInitialised', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should return false when appboy is undefined', async () => {
        const isAppboyInitialisedReturn = await isAppboyInitialised();
        expect(isAppboyInitialisedReturn).toBe(false);
    });

    it('should return false when getUser is undefined', async () => {
        // Arrange
        getUserId.mockImplementation(hasUserId => hasUserId(null));

        // Act
        const isAppboyInitialisedReturn = await isAppboyInitialised(appboy);

        // Assert
        expect(isAppboyInitialisedReturn).toBe(false);
    });

    it('should return true when getUserId returns a truthy value', async () => {
        // Arrange
        getUserId.mockImplementation(hasUserId => hasUserId(id));

        // Act
        const isAppboyInitialisedReturn = await isAppboyInitialised(appboy);

        // Assert
        expect(isAppboyInitialisedReturn).toBe(true);
    });
});
