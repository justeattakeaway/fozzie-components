import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import setupResponseTimeRecording from '../src/responseTimes';

let instance;
let mock;

// eslint-disable-next-line no-unused-vars
const withDelay = (delay, response) => () => new Promise((resolve, _) => setTimeout(() => resolve(response), delay));

beforeEach(() => {
    instance = axios.create();
});

describe('setupResponseTimeRecording', () => {
    it.each([
        'request',
        'response'
    ])('should add %s interceptor', interceptorType => {
        // Arrange
        setupResponseTimeRecording(instance);

        // Assert
        expect(instance.interceptors[interceptorType].handlers.length).toBe(1);
    });
});

describe('request interceptor', () => {
    it('should add requestStartedAt', async () => {
        // Arrange
        mock = new MockAdapter(instance);
        mock.onGet('/test').reply(200);
        setupResponseTimeRecording(instance);

        // Act
        const response = await instance.get('/test');

        // Assert
        expect(response.config.meta.requestStartedAt).toBeDefined();
        expect(response.config.meta.requestStartedAt).toEqual(expect.any(Number));
        expect(response.config.meta.requestStartedAt).toBeGreaterThan(0);
    });
});

describe('response interceptor', () => {
    it('should add responseTimeMs', async () => {
        // Arrange
        const delay = 100;
        console.log(`Delay         : ${delay}ms`); // eslint-disable-line no-console

        mock = new MockAdapter(instance);
        mock.onGet('/test').reply(withDelay(delay, [200]));
        setupResponseTimeRecording(instance);

        // Act
        const response = await instance.get('/test');

        // Assert
        expect(response.responseTimeMs).toBeDefined();
        expect(response.responseTimeMs).toEqual(expect.any(Number));
        expect(response.responseTimeMs).toBeGreaterThanOrEqual(delay);
        console.log(`Response time : ${delay}ms`); // eslint-disable-line no-console
    });
});
