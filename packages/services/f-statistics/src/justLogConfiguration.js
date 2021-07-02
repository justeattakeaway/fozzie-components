import {
    justLog,
    JustEatLoggingService
} from '@justeat/just-log';

const configureJustLog = configuration => {
    justLog
        .forFeature({
            name: 'f-statistics',
            tenant: configuration.tenant,
            version: configuration.clientVersion,
            environment: configuration.environment
        })
        .to(new JustEatLoggingService(configuration.loggingEndpointUri));

    return justLog;
};

export default configureJustLog;
