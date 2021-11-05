import CheckoutExperimentationModule from '../checkoutExperimentation.module';
import { defaultExperimentationState } from '../../components/_tests/helpers/setup';
import { HEADER_LOW_VALUE_ORDER_EXPERIMENT } from '../../constants';
import { UPDATE_EXPERIMENTS_STATE } from '../mutation-types';

const { actions, getters } = CheckoutExperimentationModule;

const { setExperimentValues } = actions;

describe('CheckoutExperimentationModule', () => {
    let state = CheckoutExperimentationModule.state();

    it('should create default state when initialised.', () => {
        // Assert
        expect(state).toEqual(defaultExperimentationState);
    });

    describe('actions ::', () => {
        let commit;

        beforeEach(() => {
            commit = jest.fn();
            state = CheckoutExperimentationModule.state();
        });

        afterEach(() => {
            jest.clearAllMocks();
        });

        describe('setExperimentValues ::', () => {
            it(`should call ${UPDATE_EXPERIMENTS_STATE} with passed field(s)`, () => {
                // Arrange
                const experiments = {
                    // eslint-disable-next-line camelcase
                    low_value_order_phase_2_web: {
                        Name: 'experiment_test',
                        Domain: 'Menu',
                        Variant: 'true',
                        UseBackendHttpHeaders: true,
                        Version: 1
                    }
                };

                // Act
                setExperimentValues({ commit }, experiments);

                // Assert
                expect(commit).toHaveBeenCalledWith(UPDATE_EXPERIMENTS_STATE, { lowValueOrderExperimentVariant: 'true' });
            });

            it(`should call ${UPDATE_EXPERIMENTS_STATE} with empty string if no variant is present`, () => {
                // Arrange
                const experiments = {
                    // eslint-disable-next-line camelcase
                    low_value_order_threshold_web: {
                        Name: 'experiment_test',
                        Domain: 'Menu',
                        Variant: undefined,
                        UseBackendHttpHeaders: true,
                        Version: 1
                    }
                };

                // Act
                setExperimentValues({ commit }, experiments);

                // Assert
                expect(commit).toHaveBeenCalledWith(UPDATE_EXPERIMENTS_STATE, { lowValueOrderExperimentVariant: '' });
            });

            it(`should call ${UPDATE_EXPERIMENTS_STATE} with empty string if no experiment is present`, () => {
                // Arrange
                const experiments = {};

                // Act
                setExperimentValues({ commit }, experiments);

                // Assert
                expect(commit).toHaveBeenCalledWith(UPDATE_EXPERIMENTS_STATE, { lowValueOrderExperimentVariant: '' });
            });
        });
    });

    describe('getters ::', () => {
        beforeEach(() => {
            state = CheckoutExperimentationModule.state();
        });

        describe('getExperimentsHeaders ::', () => {
            it('should get the header values to pass to API calls', () => {
                // Arrange
                state.lowValueOrderExperimentVariant = 'true';

                // Act
                const result = getters.getExperimentsHeaders(state);

                // Assert
                expect(result).toEqual({
                    [HEADER_LOW_VALUE_ORDER_EXPERIMENT]: 'true'
                });
            });
        });
    });
});
