import appboySDK from 'appboy-web-sdk';
import initialiseBraze, { sessionTimeoutInSeconds } from '../index';
import configureBraze from '../configureBraze';
import isAppboyInitialised from '../utils/isAppboyInitialised';

jest.mock('../configureBraze');
jest.mock('../utils/isAppboyInitialised');


jest.mock('appboy-web-sdk', () => ({
    initialize: jest.fn(),
    display: {
        showInAppMessage: jest.fn()
    },
    openSession: jest.fn(),
    changeUser: jest.fn(),
    ab: {
        InAppMessage: Object
    }
}));

const apiKey = '__API_KEY__';
const userId = '__USER_ID__';
const enableLogging = true;
const disableComponent = false;

const settings = {
    apiKey,
    userId,
    enableLogging,
    disableComponent
};

describe('f-metadata', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('should resolve as null if disableComponent is provided', async () => {
        // Arrange & Act
        const instance = await initialiseBraze({ ...settings, disableComponent: true });

        // Assert
        expect(instance).toBe(null);
    });

    it('should not call initialise if apiKey is not set', async () => {
        // Arrange & Act
        await initialiseBraze({ ...settings, apiKey: undefined });

        // Assert
        expect(appboySDK.initialize).not.toHaveBeenCalled();
    });

    it('should not call initialise if userId is not set', async () => {
        // Arrange & Act
        await initialiseBraze({ ...settings, userId: undefined });

        // Assert
        expect(appboySDK.initialize).not.toHaveBeenCalled();
    });

    it('should only call configuration if an instance of appboy already exists on window', async () => {
        // Arrange
        global.appboy = '__APPBOY__';
        isAppboyInitialised.mockReturnValue(true);

        // Act
        const output = await initialiseBraze(settings);

        // Assert
        expect(configureBraze).toHaveBeenCalledWith(settings);
        expect(output).toEqual(global.appboy);
    });

    it('should initialise appboy and setup relevant settings', async () => {
        // Arrange & Act
        await initialiseBraze(settings);

        // Assert
        expect(appboySDK.initialize).toHaveBeenCalledWith(apiKey, { enableLogging, sessionTimeoutInSeconds });
        expect(appboySDK.openSession).toHaveBeenCalled();
    });

    it('should fire a datalayer event when change user is called', async () => {
        // Arrange
        const push = jest.fn();
        window.dataLayer = { push };

        // Act
        await initialiseBraze(settings);

        const [{ 1: analyticsCallback }] = appboySDK.changeUser.mock.calls;
        analyticsCallback();

        // Assert
        expect(push).toHaveBeenCalledWith({ event: 'appboyReady' });
    });
});
