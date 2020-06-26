import appboySDK from 'appboy-web-sdk';
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
    },
    logCardClick: jest.fn(),
    logCardImpressions: jest.fn(),
    requestImmediateDataFlush: jest.fn()
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

let initialiseBraze,
    sessionTimeoutInSeconds;

describe('f-metadata', () => {
    beforeEach(() => {
        jest.resetAllMocks();
        jest.isolateModules(() => {
            // eslint-disable-next-line global-require
            ({ initialise: initialiseBraze, sessionTimeoutInSeconds } = require('../index'));
        });
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
        const output = await initialiseBraze(settings);

        // Assert
        expect(appboySDK.initialize).toHaveBeenCalledWith(apiKey, { enableLogging, sessionTimeoutInSeconds });
        expect(appboySDK.openSession).toHaveBeenCalled();
        expect(output).toEqual(appboySDK);
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

    it('should reject with an error when the configuration fails', async () => {
        // Arrange
        configureBraze.mockImplementation(() => { throw new Error('foo'); });

        // Act
        const appBoy = initialiseBraze(settings);

        // Assert
        await expect(appBoy).rejects.toThrow('An error occurred while loading the component: Error: foo');
    });

    describe('when called twice', () => {
        it('should return different promises that resolve to the same value', async () => {
            // Arrange
            const appBoy1 = initialiseBraze(settings);

            // Act
            const appBoy2 = initialiseBraze(settings);

            // Assert
            expect(appBoy1).not.toBe(appBoy2);
            await expect(appBoy1).resolves.toBe(await appBoy2);
        });

        it('should call configureBraze each time it is called', async () => {
            // Arrange
            await initialiseBraze(settings);

            // Act
            await initialiseBraze(settings);

            // Assert
            expect(configureBraze).toHaveBeenCalledTimes(2);
        });
    });
});

describe('when f-metadata is initialized', () => {
    let logCardClick,
        logCardImpressions;

    beforeAll(async () => {
        // Arrange
        jest.isolateModules(() => {
            // eslint-disable-next-line global-require
            ({ initialise: initialiseBraze, logCardClick, logCardImpressions } = require('../index'));
        });

        await initialiseBraze(settings);
    });

    beforeEach(() => {
        jest.resetAllMocks();
    });

    describe('logCardClick', () => {
        it('should call logCardClick within appboy SDK and flush', async () => {
            // Act
            await logCardClick();

            // Assert
            expect(appboySDK.logCardClick).toHaveBeenCalled();
            expect(appboySDK.requestImmediateDataFlush).toHaveBeenCalled();
        });

        it('should pass through the first parameter verbatim to logCardClick', async () => {
            // Arrange
            const param = { foo: 'bar' };

            // Act
            await logCardClick(param);

            // Assert
            expect(appboySDK.logCardClick).toHaveBeenCalledWith(param, true);
        });
    });

    describe('logCardImpressions', () => {
        it('should call logCardImpressions within appboy SDK and flush', async () => {
            // Act
            await logCardImpressions();

            // Assert
            expect(appboySDK.logCardImpressions).toHaveBeenCalled();
            expect(appboySDK.requestImmediateDataFlush).toHaveBeenCalled();
        });

        it('should pass through the first parameter verbatim to logCardImpressions', async () => {
            // Arrange
            const param = { foo: 'bar' };

            // Act
            await logCardImpressions(param);

            // Assert
            expect(appboySDK.logCardImpressions).toHaveBeenCalledWith(param, true);
        });
    });
});
