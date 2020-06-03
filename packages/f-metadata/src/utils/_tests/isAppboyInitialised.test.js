import isAppboyInitialised from '../isAppboyInitialised';

describe('f-metadata › isAppboyInitialised', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should return false when appboy is undefined', () => {
        expect(isAppboyInitialised()).toBe(false);
    });

    describe('getUserId', () => {
        const id = '__ID__';
        const getUserId = jest.fn();
        const appboy = {
            getUser: () => ({
                getUserId
            })
        };
        isAppboyInitialised(appboy);
        const hasUserId = getUserId.mock.calls[0][0];

        afterEach(() => {
            jest.resetAllMocks();
        });

        it('should return false when getUser is undefined', () => {
            expect(hasUserId(null)).toBe(false);
        });

        it('should return true when getUserId returns a truthy value', () => {
            expect(hasUserId(id)).toBe(true);
        });
    });
});
