import CheckoutExperimentationModule from '../checkoutExperimentation.module';
import { defaultExperimentationState } from '../../components/_tests/helpers/setup';
import { HEADER_LOW_VALUE_ORDER_EXPERIMENT } from '../../constants';

import {
    UPDATE_EXPERIMENTS_STATE
} from '../mutation-types';

const { actions, getters } = CheckoutExperimentationModule;

const {
    setExperimentValues
} = actions;

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
            const experiments = {
                // eslint-disable-next-line
                low_value_order_threshold_web: {
                    Name: 'experiment_test',
                    Domain: 'Menu',
                    Variant: true,
                    UseBackendHttpHeaders: true,
                    Version: 1
                }
            };

            it(`should call ${UPDATE_EXPERIMENTS_STATE} with passed field`, () => {
                // Act
                setExperimentValues({ commit }, experiments);

                // Assert
                expect(commit).toHaveBeenCalledWith(UPDATE_EXPERIMENTS_STATE, { lowValueOrderExperimentValue: true });
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
                state.lowValueOrderExperimentValue = true;

                // Act
                const result = getters.getExperimentsHeaders(state);

                // Assert
                expect(result).toEqual({
                    [HEADER_LOW_VALUE_ORDER_EXPERIMENT]: true
                });
            });
        });
    });
});
