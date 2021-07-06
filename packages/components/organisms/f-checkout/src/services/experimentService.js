const getLowValueOrderExperimentTracking = variant => ({
    event: 'trackExperimentV2',
    custom: {
        experiment: {
            id: 'EX-1862',
            name: 'je-exp-low_value_order_threshold',
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
