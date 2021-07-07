const getLowValueOrderExperimentTracking = variant => ({
    event: 'trackExperimentV2',
    custom: {
        experiment: {
            id: 'EX-1862',
            name: 'low_value_order_threshold',
            platform: 'experiment_api',
            version: 1,
            variant: {
                name: variant ?? 'not_applied'
            }
        }
    }
});

export default {
    getLowValueOrderExperimentTracking
};
