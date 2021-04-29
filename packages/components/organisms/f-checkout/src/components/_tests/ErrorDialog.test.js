import Vuex from 'vuex';
import { VueI18n } from '@justeat/f-globalisation';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import ErrorDialog from '../ErrorDialog.vue';
import {
    i18n, defaultCheckoutState, createStore, $logger
} from './helpers/setup';
import { ERROR_CODE_FULFILMENT_TIME_UNAVAILABLE } from '../../constants';
import EventNames from '../../event-names';

const localVue = createLocalVue();

localVue.use(VueI18n);
localVue.use(Vuex);

xdescribe('ErrorDialog', () => {
    const propsData = {
        isOpen: true,
        errorCode: ERROR_CODE_FULFILMENT_TIME_UNAVAILABLE
    };

    it('should be defined', () => {
        // Arrange
        const wrapper = shallowMount(ErrorDialog, {
            store: createStore(),
            i18n,
            localVue,
            propsData
        });

        // Assert
        expect(wrapper).toBeDefined();
    });
    describe('methods ::', () => {
        describe('handleButtonClick ::', () => {
            it('should emit the `error-button-click` event', () => {
                // Arrange
                const wrapper = shallowMount(ErrorDialog, {
                    store: createStore({ ...defaultCheckoutState, isLoggedIn: true }),
                    i18n,
                    localVue,
                    propsData,
                    mocks: {
                        $logger
                    }
                });

                // Act
                const dialogButton = wrapper.find("[data-test-id='redirect-to-menu-button']");
                dialogButton.trigger('click');

                // Assert
                expect(wrapper.emitted(EventNames.CheckoutErrorDialogButtonClicked).length).toBe(1);
            });
        });
    });
});
