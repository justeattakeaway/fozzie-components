import experimentService from '../experimentService';

describe('experimentService', () => {
    describe('getLowValueOrderExperimentTracking ::', () => {
        describe('when a variant is passed in', () => {
            it('should return the tracking object', () => {
                // Arrange
                const expectedTrackingObject = {
                    event: 'trackExperimentV2',
                    custom: {
                        experiment: {
                            id: 'EX-1862',
                            name: 'low_value_order_threshold',
                            platform: 'experiment_api',
                            version: 1,
                            variant: {
                                name: 'true'
                            }
                        }
                    }
                };

                // Act
                const actual = experimentService.getLowValueOrderExperimentTracking('true');

                // Assert
                expect(actual).toEqual(expectedTrackingObject);
            });
        });
        describe('when a variant is not present', () => {
            const expectedTrackingObject = {
                event: 'trackExperimentV2',
                custom: {
                    experiment: {
                        id: 'EX-1862',
                        name: 'low_value_order_threshold',
                        platform: 'experiment_api',
                        version: 1,
                        variant: {
                            name: 'not_applied'
                        }
                    }
                }
            };
            it('should return null', () => {
                // Act
                const actual = experimentService.getLowValueOrderExperimentTracking();

                // Assert
                expect(actual).toEqual(expectedTrackingObject);
            });
        });
    });
});
