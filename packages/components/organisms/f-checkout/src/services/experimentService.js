const getLowValueOrderExperimentTracking = variant => ({
    event: 'trackExperimentV2',
    custom: {
        experiment: {
            id: 'EX-1880',
            name: 'low_value_order_phase_2',
            platform: 'experiment_api',
            version: 1,
            variant: {
                name: variant ?? 'reserve'
            }
        }
    }
});

export default {
    getLowValueOrderExperimentTracking
};
