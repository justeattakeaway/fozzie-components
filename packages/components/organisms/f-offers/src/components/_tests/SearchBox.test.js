import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import SearchBox from '../SearchBox.vue';
import {
    ADDRESS_FOCUS,
    EMPTY_ADDRESS,
    INVALID_ADDRESS, UNKNOWN_ERROR,
    VALID_SAVED_ADDRESS_SEARCH,
    VALID_SEARCH
} from '../../store/types/actions';
import { POSTCODE_EMPTY, POSTCODE_INVALID } from '../../store/types/errors';

const STUB_NAME = 'search-box-stub';

const EVENTS = {
    ADDRESS_SEARCH_FOCUS: 'address-search-focus',
    SUBMIT_SAVED_ADDRESS: 'submit-saved-address',
    SUBMIT_VALID_ADDRESS: 'submit-valid-address',
    SEARCH_BOX_ERROR: 'searchbox-error'
};

const localVue = createLocalVue();

localVue.use(Vuex);

describe('SearchBox.vue', () => {
    let actions;
    let store;

    beforeEach(() => {
        actions = {
            [ADDRESS_FOCUS]: jest.fn(),
            [VALID_SAVED_ADDRESS_SEARCH]: jest.fn(),
            [VALID_SEARCH]: jest.fn(),
            [EMPTY_ADDRESS]: jest.fn(),
            [INVALID_ADDRESS]: jest.fn(),
            [UNKNOWN_ERROR]: jest.fn()
        };

        store = new Vuex.Store({
            actions
        });
    });

    it('should call addressFocus action when event address-search-focus is fired', () => {
        // Arrange
        const wrapper = shallowMount(SearchBox, { store, localVue });

        // Act
        wrapper.find(STUB_NAME).vm.$emit(EVENTS.ADDRESS_SEARCH_FOCUS);

        // Assert
        expect(actions[ADDRESS_FOCUS]).toHaveBeenCalled();
    });

    it('should call validSavedAddress action when event submit-saved-address is fired', () => {
        // Arrange
        const wrapper = shallowMount(SearchBox, { store, localVue });

        // Act
        wrapper.find(STUB_NAME).vm.$emit(EVENTS.SUBMIT_SAVED_ADDRESS);

        // Assert
        expect(actions[VALID_SAVED_ADDRESS_SEARCH]).toHaveBeenCalled();
    });

    it('should call validSearch action when event submit-valid-address is fired', () => {
        // Arrange
        const wrapper = shallowMount(SearchBox, { store, localVue });

        // Act
        wrapper.find(STUB_NAME).vm.$emit(EVENTS.SUBMIT_VALID_ADDRESS);

        // Assert
        expect(actions[VALID_SEARCH]).toHaveBeenCalled();
    });

    describe('handleSearchBoxError', () => {
        it(`should call emptyAddress action when errors includes ${POSTCODE_EMPTY}`, () => {
            // Arrange
            const wrapper = shallowMount(SearchBox, { store, localVue });

            // Act
            wrapper.find(STUB_NAME).vm.$emit(EVENTS.SEARCH_BOX_ERROR, [POSTCODE_EMPTY]);

            // Assert
            expect(actions[EMPTY_ADDRESS]).toHaveBeenCalled();
        });

        it(`should remove ${POSTCODE_EMPTY} from errors array after emptyAddress is called`, () => {
            // Arrange
            const wrapper = shallowMount(SearchBox, { store, localVue });

            // Act
            wrapper.find(STUB_NAME).vm.$emit(EVENTS.SEARCH_BOX_ERROR, [POSTCODE_EMPTY]);

            // Assert
            expect(actions[UNKNOWN_ERROR]).not.toHaveBeenCalled();
        });

        it(`should call invalidAddress action when errors includes ${POSTCODE_INVALID}`, () => {
            // Arrange
            const wrapper = shallowMount(SearchBox, { store, localVue });

            // Act
            wrapper.find(STUB_NAME).vm.$emit(EVENTS.SEARCH_BOX_ERROR, [POSTCODE_INVALID]);

            // Assert
            expect(actions[INVALID_ADDRESS]).toHaveBeenCalled();
        });

        it(`should remove ${POSTCODE_INVALID} from errors array after invalidAddress is called`, () => {
            // Arrange
            const wrapper = shallowMount(SearchBox, { store, localVue });

            // Act
            wrapper.find(STUB_NAME).vm.$emit(EVENTS.SEARCH_BOX_ERROR, [POSTCODE_INVALID]);

            // Assert
            expect(actions[UNKNOWN_ERROR]).not.toHaveBeenCalled();
        });

        it('should call unknownError if errors length is > 0', () => {
            // Arrange
            const wrapper = shallowMount(SearchBox, { store, localVue });

            // Act
            wrapper.find(STUB_NAME).vm.$emit(EVENTS.SEARCH_BOX_ERROR, ['__TEST_ERROR__']);

            // Assert
            expect(actions[UNKNOWN_ERROR]).toHaveBeenCalled();
        });
    });
});
