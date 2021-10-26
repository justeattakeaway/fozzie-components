/**
 * @jest-environment node
 */
import nock from 'nock';
import axios from 'axios';
import axiosRetry from '../axiosRetryWrapper';

const NETWORK_ERROR = new Error('Some connection error');
NETWORK_ERROR.code = 'ECONNRESET';

function setupMockResponses (client, responses) {
    const configureResponse = () => {
        const response = responses.shift();
        if (response) {
            response();
        }
    };
    client.interceptors.response.use(
        result => {
            configureResponse();
            return result;
        },
        error => {
            configureResponse();
            return Promise.reject(error);
        }
    );
    configureResponse();
}

describe('axiosRetry(axios, { retries, retryCondition })', () => {
    afterEach(() => {
        nock.cleanAll();
        nock.enableNetConnect();
    });

    describe('when the response is successful', () => {
        it('should resolve with it', done => {
            const client = axios.create();
            setupMockResponses(client, [
                () => nock('http://example.com').get('/test').reply(200, 'It worked!')
            ]);

            axiosRetry(client, { retryAmount: 0 });

            client.get('http://example.com/test').then(result => {
                expect(result.status).toBe(200);
                done();
            }, done.fail);
        });
    });

    describe('when the response is an error', () => {
        describe('when it satisfies the retry condition', () => {
            it('should resolve with a successful retry', done => {
                const client = axios.create();
                setupMockResponses(client, [
                    () => nock('http://example.com').get('/test').replyWithError(NETWORK_ERROR),
                    () => nock('http://example.com').get('/test').reply(200, 'It worked!')
                ]);

                axiosRetry(client);

                client.get('http://example.com/test').then(result => {
                    expect(result.status).toBe(200);
                    done();
                }, done.fail);
            });
        });
    });
});
