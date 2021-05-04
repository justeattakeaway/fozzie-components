import GetDispatcher from '../BrazeDispatcher';

const configure = jest.fn(),
    settings = {
        not: 'reflected',
        through: 'to',
        real: 'module'
    };

let sessionTimeoutInSeconds,
    initialiseBraze;

jest.mock('../BrazeDispatcher');

describe('f-braze-adapter initialise', () => {
    beforeEach(() => {
        jest.resetAllMocks();
        jest.isolateModules(() => {
            // eslint-disable-next-line global-require
            ({ initialise: initialiseBraze, sessionTimeoutInSeconds } = require('../index'));
        });
        GetDispatcher.mockImplementation(() => ({
            configure
        }));
    });

    it('should call GetDispatcher with global sessionTimeoutInSeconds', async () => {
        // Arrange & Act
        await initialiseBraze(settings);

        // Assert
        expect(GetDispatcher).toHaveBeenCalledWith(sessionTimeoutInSeconds);
    });

    it('should call configure with given settings', async () => {
        // Arrange & Act
        await initialiseBraze(settings);

        // Assert
        expect(configure).toHaveBeenCalledAfter(GetDispatcher);
        expect(configure).toHaveBeenCalledWith(settings);
    });

    it('should call configure with a blank object if no settings given', async () => {
        // Arrange & Act
        await initialiseBraze();

        // Assert
        expect(configure).toHaveBeenCalledWith({});
    });

    it('should wrap and rethrow an error if thrown by configure', async () => {
        const message = 'Punkd!';

        // Arrange
        expect.assertions(1);
        configure.mockImplementation(() => {
            throw new Error(message);
        });

        try {
            // Act
            await initialiseBraze(settings);
        } catch (e) {
            // Assert
            expect(e.message).toMatch(`An error occurred while loading the component: Error: ${message}`);
        }
    });
});
