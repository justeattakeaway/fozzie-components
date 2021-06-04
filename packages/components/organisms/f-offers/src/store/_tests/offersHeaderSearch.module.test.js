import {
    ADDRESS_FOCUS,
    EMPTY_ADDRESS,
    INVALID_ADDRESS,
    UNKNOWN_ERROR,
    VALID_SAVED_ADDRESS_SEARCH, VALID_SEARCH
} from '../types/actions';
import EMIT_SEARCH_START from '../types/mutations';
import { pushToDataLayer, setGtmEventCookie } from '../../utils/helpers';
import { DEFAULT_CATEGORY, DEFAULT_ACTION, offersHeaderSearchModule } from '../offersHeaderSearch.module';

jest.mock('../../utils/helpers');

const { actions, mutations } = offersHeaderSearchModule;

const defaultSate = {
    startSearchEmitted: false
};

let state = offersHeaderSearchModule.state();

describe('offersHeaderSearchModule', () => {
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

        describe(`${ADDRESS_FOCUS} ::`, () => {
            it('should push to the datalayer with label "start" when startSearchEmitted is false', () => {
                // Act
                actions[ADDRESS_FOCUS]({ commit, state });

                // Assert
                expect(pushToDataLayer).toHaveBeenCalledWith(DEFAULT_CATEGORY, DEFAULT_ACTION, 'start');
            });

            it('should commit startSearchEmitted true to state', () => {
                // Act
                actions[ADDRESS_FOCUS]({ commit, state });

                // Assert
                expect(commit).toHaveBeenCalledWith(EMIT_SEARCH_START);
            });

            it('should NOT push to the datalayer with label "start" when startSearchEmitted is true', () => {
                // Arrange
                state.startSearchEmitted = true;

                // Act
                actions[ADDRESS_FOCUS]({ commit, state });

                // Assert
                expect(pushToDataLayer).not.toHaveBeenCalled();
            });
        });

        it(`should push "error_address_missing" to the datalayer when ${EMPTY_ADDRESS} is called`, () => {
            // Act
            actions[EMPTY_ADDRESS]();

            // Assert
            expect(pushToDataLayer).toHaveBeenCalledWith(DEFAULT_CATEGORY, DEFAULT_ACTION, 'error_address_missing');
        });

        it(`should push "error_invalid_postcode" to the datalayer when ${INVALID_ADDRESS} is called`, () => {
            // Act
            actions[INVALID_ADDRESS]();

            // Assert
            expect(pushToDataLayer).toHaveBeenCalledWith(DEFAULT_CATEGORY, DEFAULT_ACTION, 'error_invalid_postcode');
        });

        it(`should push "error_unknown" to the datalayer when ${UNKNOWN_ERROR} is called`, () => {
            // Act
            actions[UNKNOWN_ERROR]();

            // Assert
            expect(pushToDataLayer).toHaveBeenCalledWith(DEFAULT_CATEGORY, DEFAULT_ACTION, 'error_unknown');
        });

        it(`should set gtm event cookie with "valid_saved" when ${VALID_SAVED_ADDRESS_SEARCH} is called`, () => {
            // Act
            actions[VALID_SAVED_ADDRESS_SEARCH]();

            // Assert
            expect(setGtmEventCookie).toHaveBeenCalledWith(DEFAULT_CATEGORY, DEFAULT_ACTION, 'valid_saved');
        });

        it(`should set gtm event cookie with "valid_selected" when ${VALID_SEARCH} is called`, () => {
            // Act
            actions[VALID_SEARCH]();

            // Assert
            expect(setGtmEventCookie).toHaveBeenCalledWith(DEFAULT_CATEGORY, DEFAULT_ACTION, 'valid_selected');
        });
    });

    describe('mutations ::', () => {
        it(`should set startSearchEmitted when ${EMIT_SEARCH_START} is called`, () => {
            // Act
            mutations[EMIT_SEARCH_START](state);

            // Assert
            expect(state.startSearchEmitted).toEqual(true);
        });
    });
});
