import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import axiosServices from '../src/axios';

const { getNetworkDetails, setupResponseTimeRecording } = axiosServices;

let instance;
let mock;
let callback;
let windowSpy;

// eslint-disable-next-line no-unused-vars
const withDelay = (delay, response) => () => new Promise((resolve, _) => setTimeout(() => resolve(response), delay));

beforeEach(() => {
    instance = axios.create();
    callback = jest.fn();
});

afterEach(() => {
    jest.resetAllMocks();
});

describe('getNetworkDetails', () => {
    it('should return `null` when navigator is undefined', () => {
        // Arrange
        windowSpy = jest.spyOn(window, 'navigator', 'get');
        windowSpy.mockImplementation(() => undefined);

        // Act
        const connection = getNetworkDetails();

        // Assert
        expect(connection).toBe(null);
    });

    it('should return navigation.connection if it is defined', () => {
        // Arrange
        windowSpy = jest.spyOn(window, 'navigator', 'get');
        windowSpy.mockImplementation(() => ({ connection: 'CONNECTION' }));

        // Act
        const connection = getNetworkDetails();

        // Assert
        expect(connection).toBe('CONNECTION');
    });

    it('should return navigation.mozConnection if it is defined and navigator.connection is not', () => {
        // Arrange
        windowSpy = jest.spyOn(window, 'navigator', 'get');
        windowSpy.mockImplementation(() => ({
            mozConnection: 'MOZ-CONNECTION'
        }));

        // Act
        const connection = getNetworkDetails();

        // Assert
        expect(connection).toBe('MOZ-CONNECTION');
    });

    it('should return navigation.mozConnection preferentially over navigator.webkitConnection', () => {
        // Arrange
        windowSpy = jest.spyOn(window, 'navigator', 'get');
        windowSpy.mockImplementation(() => ({
            mozConnection: 'MOZ-CONNECTION',
            webkitConnection: 'WEBKIT-CONNECTION'
        }));

        // Act
        const connection = getNetworkDetails();

        // Assert
        expect(connection).toBe('MOZ-CONNECTION');
    });

    it('should return navigation.webkitConnection if it is defined and navigator.connection and navigator.mozConnection are not', () => {
        // Arrange
        windowSpy = jest.spyOn(window, 'navigator', 'get');
        windowSpy.mockImplementation(() => ({
            webkitConnection: 'WEBKIT-CONNECTION'
        }));

        // Act
        const connection = getNetworkDetails();

        // Assert
        expect(connection).toBe('WEBKIT-CONNECTION');
    });
});


describe('setupResponseTimeRecording', () => {
    it.each([
        'request',
        'response'
    ])('should add %s interceptor', interceptorType => {
        // Arrange
        setupResponseTimeRecording(instance, callback);

        // Assert
        expect(instance.interceptors[interceptorType].handlers.length).toBe(1);
    });

    it.each([
        ['request', {}],
        ['request', true],
        ['request', 1],
        ['request', 'string'],
        ['response', {}],
        ['response', true],
        ['response', 1],
        ['response', 'string']
    ])('should not add %s interceptor if callback is %p and not a function', (interceptorType, cb) => {
        // Arrange
        setupResponseTimeRecording(instance, cb);

        // Assert
        expect(instance.interceptors[interceptorType].handlers.length).toBe(0);
    });
});

describe('request interceptor', () => {
    it('should add `requestStartedAt`', async () => {
        // Arrange
        mock = new MockAdapter(instance);
        mock.onGet('/test').reply(200);
        setupResponseTimeRecording(instance, callback);

        // Act
        const response = await instance.get('/test');

        // Assert
        expect(response.config.meta.requestStartedAt).toBeDefined();
        expect(response.config.meta.requestStartedAt).toEqual(expect.any(Number));
        expect(response.config.meta.requestStartedAt).toBeGreaterThan(0);
    });
});

describe('response interceptor', () => {
    it('should add `responseTimeMs`', async () => {
        // Arrange
        const delay = 100;
        console.log(`Delay         : ${delay}ms`); // eslint-disable-line no-console

        mock = new MockAdapter(instance);
        mock.onGet('/test').reply(withDelay(delay, [200]));
        setupResponseTimeRecording(instance, callback);

        // Act
        const response = await instance.get('/test');

        // Assert
        expect(response.responseTimeMs).toBeDefined();
        expect(response.responseTimeMs).toEqual(expect.any(Number));
        expect(response.responseTimeMs).toBeGreaterThanOrEqual(delay);
        console.log(`Response time : ${delay}ms`); // eslint-disable-line no-console
    });

    it('should call callback function', async () => {
        // Arrange
        mock = new MockAdapter(instance);
        mock.onGet('/test').reply(200);
        setupResponseTimeRecording(instance, callback);

        // Act
        await instance.get('/test');

        // Assert
        expect(callback).toHaveBeenCalledTimes(1);
    });

    it('should call callback function for every request', async () => {
        // Arrange
        mock = new MockAdapter(instance);
        mock.onGet('/test').reply(200);
        setupResponseTimeRecording(instance, callback);

        // Act
        await instance.get('/test');
        await instance.get('/test');
        await instance.get('/test');

        // Assert
        expect(callback).toHaveBeenCalledTimes(3);
    });
});
