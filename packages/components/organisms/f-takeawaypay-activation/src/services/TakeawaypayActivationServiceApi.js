import axios from 'axios';
import logInvoker from './LoggingService';

const activateLogData = consumerId => ({
    ConsumerId: consumerId
});

export default {
    async isActivationAvailable (url, store, logger) {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                },
                timeout: 10000
            };

            const { data } = await axios.get(url, config);
            return data.available;
        } catch (error) {
            logInvoker({
                message: 'Fetching TakeawayPay account linking availability failed',
                data: {},
                logMethod: logger.logError,
                error,
                store
            });
            return false;
        }
    },

    async activate (url, authToken, consumerId, store, logger) {
        try {
            const authHeader = authToken && `Bearer ${authToken}`;

            const config = {
                headers: {
                    'Content-Type': 'application/json-patch+json',
                    ...(authToken && {
                        Authorization: authHeader
                    })
                },
                timeout: 10000
            };

            const request = {
                op: 'replace',
                path: '/consumer',
                value: {
                    id: consumerId
                }
            };

            const { status } = await axios.patch(url, request, config);

            if (status === 200) {
                logInvoker({
                    message: 'TakeawayPay account linking succeeded',
                    data: activateLogData(consumerId),
                    logMethod: logger.logInfo,
                    store
                });
                return true;
            }

            return false;
        } catch (error) {
            logInvoker({
                message: 'TakeawayPay account linking failed',
                data: activateLogData(consumerId),
                logMethod: logger.logError,
                error,
                store
            });
            return false;
        }
    }
};
