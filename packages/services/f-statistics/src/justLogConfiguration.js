import {
    justLog,
    JustEatLoggingService
} from '@justeat/just-log';

const configureJustLog = configuration => {
    justLog
        .forFeature({
            name: 'f-statistics',
            tenant: 'all',
            version: '1.0.0',
            environment: configuration.environment
        })
        .to(new JustEatLoggingService(configuration.loggingEndpointUri));

    return justLog;
};

export default configureJustLog;
