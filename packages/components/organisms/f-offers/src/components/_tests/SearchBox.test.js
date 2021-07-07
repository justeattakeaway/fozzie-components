import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import SearchBox from '../SearchBox.vue';
import {
    ACTION_ADDRESS_FOCUS,
    ACTION_VALID_SAVED_ADDRESS_SEARCH,
    ACTION_VALID_SEARCH,
    ACTION_INVALID_ADDRESS,
    ACTION_EMPTY_ADDRESS,
    ACTION_UNKNOWN_ERROR,
    VUEX_MODULE_NAMESPACE_OFFERS_SEARCH
} from '../../store/types';
import { POSTCODE_EMPTY, POSTCODE_INVALID } from '../../constants';

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
            [ACTION_ADDRESS_FOCUS]: jest.fn(),
            [ACTION_VALID_SAVED_ADDRESS_SEARCH]: jest.fn(),
            [ACTION_VALID_SEARCH]: jest.fn(),
            [ACTION_EMPTY_ADDRESS]: jest.fn(),
            [ACTION_INVALID_ADDRESS]: jest.fn(),
            [ACTION_UNKNOWN_ERROR]: jest.fn()
        };

        store = new Vuex.Store({
            modules: {
                [VUEX_MODULE_NAMESPACE_OFFERS_SEARCH]: {
                    namespaced: true,
                    actions
                }
            }
        });
    });

    it('should call addressFocus action when event address-search-focus is fired', () => {
        // Arrange
        const wrapper = shallowMount(SearchBox, { store, localVue });

        // Act
        wrapper.find(STUB_NAME).vm.$emit(EVENTS.ADDRESS_SEARCH_FOCUS);

        // Assert
        expect(actions[ACTION_ADDRESS_FOCUS]).toHaveBeenCalled();
    });

    it('should call validSavedAddress action when event submit-saved-address is fired', () => {
        // Arrange
        const wrapper = shallowMount(SearchBox, { store, localVue });

        // Act
        wrapper.find(STUB_NAME).vm.$emit(EVENTS.SUBMIT_SAVED_ADDRESS);

        // Assert
        expect(actions[ACTION_VALID_SAVED_ADDRESS_SEARCH]).toHaveBeenCalled();
    });

    it('should call validSearch action when event submit-valid-address is fired', () => {
        // Arrange
        const wrapper = shallowMount(SearchBox, { store, localVue });

        // Act
        wrapper.find(STUB_NAME).vm.$emit(EVENTS.SUBMIT_VALID_ADDRESS);

        // Assert
        expect(actions[ACTION_VALID_SEARCH]).toHaveBeenCalled();
    });

    describe('handleSearchBoxError', () => {
        it(`should call emptyAddress action when errors includes ${POSTCODE_EMPTY}`, () => {
            // Arrange
            const wrapper = shallowMount(SearchBox, { store, localVue });

            // Act
            wrapper.find(STUB_NAME).vm.$emit(EVENTS.SEARCH_BOX_ERROR, [POSTCODE_EMPTY]);

            // Assert
            expect(actions[ACTION_EMPTY_ADDRESS]).toHaveBeenCalled();
        });

        it(`should remove ${POSTCODE_EMPTY} from errors array after emptyAddress is called`, () => {
            // Arrange
            const wrapper = shallowMount(SearchBox, { store, localVue });

            // Act
            wrapper.find(STUB_NAME).vm.$emit(EVENTS.SEARCH_BOX_ERROR, [POSTCODE_EMPTY]);

            // Assert
            expect(actions[ACTION_UNKNOWN_ERROR]).not.toHaveBeenCalled();
        });

        it(`should call invalidAddress action when errors includes ${POSTCODE_INVALID}`, () => {
            // Arrange
            const wrapper = shallowMount(SearchBox, { store, localVue });

            // Act
            wrapper.find(STUB_NAME).vm.$emit(EVENTS.SEARCH_BOX_ERROR, [POSTCODE_INVALID]);

            // Assert
            expect(actions[ACTION_INVALID_ADDRESS]).toHaveBeenCalled();
        });

        it(`should remove ${POSTCODE_INVALID} from errors array after invalidAddress is called`, () => {
            // Arrange
            const wrapper = shallowMount(SearchBox, { store, localVue });

            // Act
            wrapper.find(STUB_NAME).vm.$emit(EVENTS.SEARCH_BOX_ERROR, [POSTCODE_INVALID]);

            // Assert
            expect(actions[ACTION_UNKNOWN_ERROR]).not.toHaveBeenCalled();
        });

        it('should call unknownError if errors length is > 0', () => {
            // Arrange
            const wrapper = shallowMount(SearchBox, { store, localVue });

            // Act
            wrapper.find(STUB_NAME).vm.$emit(EVENTS.SEARCH_BOX_ERROR, ['__TEST_ERROR__']);

            // Assert
            expect(actions[ACTION_UNKNOWN_ERROR]).toHaveBeenCalled();
        });
    });
});
