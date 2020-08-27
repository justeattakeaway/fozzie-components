import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import axiosServices from '../src/axios';

let instance;
let mock;
let callback;

// eslint-disable-next-line no-unused-vars
const withDelay = (delay, response) => () => new Promise((resolve, _) => setTimeout(() => resolve(response), delay));

beforeEach(() => {
    instance = axios.create();
    callback = jest.fn();
});

describe('setupResponseTimeRecording', () => {
    it.each([
        'request',
        'response'
    ])('should add %s interceptor', interceptorType => {
        // Arrange
        axiosServices.setupResponseTimeRecording(instance, callback);

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
        axiosServices.setupResponseTimeRecording(instance, cb);

        // Assert
        expect(instance.interceptors[interceptorType].handlers.length).toBe(0);
    });
});

describe('request interceptor', () => {
    it('should add `requestStartedAt`', async () => {
        // Arrange
        mock = new MockAdapter(instance);
        mock.onGet('/test').reply(200);
        axiosServices.setupResponseTimeRecording(instance, callback);

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
        axiosServices.setupResponseTimeRecording(instance, callback);

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
        axiosServices.setupResponseTimeRecording(instance, callback);

        // Act
        await instance.get('/test');

        // Assert
        expect(callback).toHaveBeenCalledTimes(1);
    });

    it('should call callback function for every request', async () => {
        // Arrange
        mock = new MockAdapter(instance);
        mock.onGet('/test').reply(200);
        axiosServices.setupResponseTimeRecording(instance, callback);

        // Act
        await instance.get('/test');
        await instance.get('/test');
        await instance.get('/test');

        // Assert
        expect(callback).toHaveBeenCalledTimes(3);
    });
});
