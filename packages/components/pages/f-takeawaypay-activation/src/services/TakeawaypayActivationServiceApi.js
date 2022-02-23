import axios from 'axios';

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
        const logData = availabilityLogData(employeeId);
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                },
                timeout: 10000
            };

            const { data } = await axios.get(url, config);

            logger.info(
                'TakeawayPay account linking fetched availability',
                'takeawaypay',
                logData
            );

            return data.available;
        } catch (error) {
            logger.error(
                'TakeawayPay account linking not available',
                error,
                'takeawaypay',
                {
                    ...logData,
                    exception: error.name,
                    exceptionMessage: error.message,
                    exceptionStackTrace: error.stack,
                    traceId: error.traceId || (error.response && error.response.data.traceId),
                    errorCode: error.errorCode
                }
            );
            return false;
        }
    },

    async activate (url, employeeId, authToken, consumerId, logger) {
        const logData = activateLogData(employeeId, consumerId);
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
                logger.info(
                    'TakeawayPay account linking succeeded',
                    'takeawaypay',
                    logData
                );
                return true;
            }

            return false;
        } catch (error) {
            logger.error(
                'TakeawayPay account linking failed',
                error,
                'takeawaypay',
                {
                    ...logData,
                    exception: error.name,
                    exceptionMessage: error.message,
                    exceptionStackTrace: error.stack,
                    traceId: error.traceId || (error.response && error.response.data.traceId),
                    errorCode: error.errorCode
                }
            );
            return false;
        }
    }
};
