import {
    ACTION_ADDRESS_FOCUS,
    ACTION_EMPTY_ADDRESS,
    ACTION_INVALID_ADDRESS,
    ACTION_UNKNOWN_ERROR,
    ACTION_VALID_SAVED_ADDRESS_SEARCH,
    ACTION_VALID_SEARCH,
    MUTATION_EMIT_SEARCH_START
} from '../types';
import { pushToDataLayer, setGtmEventCookie } from '../../utils/helpers';
import { DEFAULT_CATEGORY, DEFAULT_ACTION, offersSearchModule } from '../offersSearch.module';

jest.mock('../../utils/helpers');

const { actions, mutations } = offersSearchModule;

const defaultSate = {
    startSearchEmitted: false
};

let state = offersSearchModule.state();

describe('offersSearchModule', () => {
    it('should create default state when initialized', () => {
        // Act
        expect(state).toEqual(defaultSate);
    });

    describe('actions ::', () => {
        let commit;

        beforeEach(() => {
            // Arrange
            commit = jest.fn();
            state = defaultSate;
            jest.resetAllMocks();
        });

        describe(`${ACTION_ADDRESS_FOCUS} ::`, () => {
            it('should push to the datalayer with label "start" when startSearchEmitted is false', () => {
                // Act
                actions[ACTION_ADDRESS_FOCUS]({ commit, state });

                // Assert
                expect(pushToDataLayer).toHaveBeenCalledWith(DEFAULT_CATEGORY, DEFAULT_ACTION, 'start');
            });

            it('should commit startSearchEmitted true to state', () => {
                // Act
                actions[ACTION_ADDRESS_FOCUS]({ commit, state });

                // Assert
                expect(commit).toHaveBeenCalledWith(MUTATION_EMIT_SEARCH_START);
            });

            it('should NOT push to the datalayer with label "start" when startSearchEmitted is true', () => {
                // Arrange
                state.startSearchEmitted = true;

                // Act
                actions[ACTION_ADDRESS_FOCUS]({ commit, state });

                // Assert
                expect(pushToDataLayer).not.toHaveBeenCalled();
            });
        });

        it(`should push "error_address_missing" to the datalayer when ${ACTION_EMPTY_ADDRESS} is called`, () => {
            // Act
            actions[ACTION_EMPTY_ADDRESS]();

            // Assert
            expect(pushToDataLayer).toHaveBeenCalledWith(DEFAULT_CATEGORY, DEFAULT_ACTION, 'error_address_missing');
        });

        it(`should push "error_invalid_postcode" to the datalayer when ${ACTION_INVALID_ADDRESS} is called`, () => {
            // Act
            actions[ACTION_INVALID_ADDRESS]();

            // Assert
            expect(pushToDataLayer).toHaveBeenCalledWith(DEFAULT_CATEGORY, DEFAULT_ACTION, 'error_invalid_postcode');
        });

        it(`should push "error_unknown" to the datalayer when ${ACTION_UNKNOWN_ERROR} is called`, () => {
            // Act
            actions[ACTION_UNKNOWN_ERROR]();

            // Assert
            expect(pushToDataLayer).toHaveBeenCalledWith(DEFAULT_CATEGORY, DEFAULT_ACTION, 'error_unknown');
        });

        it(`should set gtm event cookie with "valid_saved" when ${ACTION_VALID_SAVED_ADDRESS_SEARCH} is called`, () => {
            // Act
            actions[ACTION_VALID_SAVED_ADDRESS_SEARCH]();

            // Assert
            expect(setGtmEventCookie).toHaveBeenCalledWith(DEFAULT_CATEGORY, DEFAULT_ACTION, 'valid_saved');
        });

        it(`should set gtm event cookie with "valid_selected" when ${ACTION_VALID_SEARCH} is called`, () => {
            // Act
            actions[ACTION_VALID_SEARCH]();

            // Assert
            expect(setGtmEventCookie).toHaveBeenCalledWith(DEFAULT_CATEGORY, DEFAULT_ACTION, 'valid_selected');
        });
    });

    describe('mutations ::', () => {
        it(`should set startSearchEmitted when ${MUTATION_EMIT_SEARCH_START} is called`, () => {
            // Act
            mutations[MUTATION_EMIT_SEARCH_START](state);

            // Assert
            expect(state.startSearchEmitted).toEqual(true);
        });
    });
});
