import axios from 'axios';
import logInvoker from './LoggingService';

const availabilityLogData = (employeeId, linkingAvailable = false) => ({
    TakeawayPayEmployeeId: employeeId,
    TakeawayPayLinkingAvailable: linkingAvailable
});

const activateLogData = (employeeId, consumerId) => ({
    TakeawayPayEmployeeId: employeeId,
    ConsumerId: consumerId
});

export default {
    async isActivationAvailable (url, employeeId, logger) {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                },
                timeout: 10000
            };

            const { data } = await axios.get(url, config);

            logInvoker({
                message: 'TakeawayPay account linking fetched availability',
                data: availabilityLogData(employeeId, data.available),
                logMethod: logger.info
            });

            return data.available;
        } catch (error) {
            logInvoker({
                message: 'TakeawayPay account linking not available',
                data: availabilityLogData(employeeId),
                logMethod: logger.warn,
                error
            });
            return false;
        }
    },

    async activate (url, employeeId, authToken, consumerId, logger) {
        try {
            const authHeader = authToken && `Bearer ${authToken}`;

            const config = {
                headers: {
                    'Content-Type': 'application/json-patch+json',
                    ...(authToken && {
                        Authorization: authHeader
                    })
                },
                timeout: 20000
            };

            const request = [{
                op: 'replace',
                path: '/consumer',
                value: {
                    id: consumerId
                }
            }];

            const { status } = await axios.patch(url, request, config);

            if (status === 200) {
                logInvoker({
                    message: 'TakeawayPay account linking succeeded',
                    data: activateLogData(employeeId, consumerId),
                    logMethod: logger.info
                });
                return true;
            }

            return false;
        } catch (error) {
            logInvoker({
                message: 'TakeawayPay account linking failed',
                data: activateLogData(employeeId, consumerId),
                logMethod: logger.error,
                error
            });
            return false;
        }
    }
};
