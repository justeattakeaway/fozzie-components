import Vuex from 'vuex';
import { shallowMount } from '@vue/test-utils';
import AccountInfo from '../AccountInfo.vue';
import {
    localVue,
    i18n,
    baseUrl,
    token
} from '../../../test-utils/setup';

const createStore = ({ state = {}, actions = {} } = {}) => new Vuex.Store({
    modules: {
        fAccountInfoModule: {
            state,
            actions,
            namespaced: true
        }
    }
});

let sutProps;

describe('AccountInfo', () => {
    beforeEach(() => {
        // Arrange
        sutProps = {
            authToken: token,
            isAuthFinished: true,
            smartGatewayBaseUrl: baseUrl
        };
    });

    describe('when mounting the component', () => {
        it('should not call initialise method if the authorisation has not completed', () => {
            // Arrange
            const initialiseSpy = jest.fn();
            AccountInfo.methods.initialise = initialiseSpy;

            // Act
            shallowMount(AccountInfo, {
                i18n,
                localVue,
                propsData: { ...sutProps, isAuthFinished: false },
                store: createStore()
            });

            // Assert
            expect(initialiseSpy).not.toHaveBeenCalled();
        });

        it('should only call initialise method once the authorisation has completed', async () => {
            // Arrange
            const initialiseSpy = jest.fn();
            AccountInfo.methods.initialise = initialiseSpy;

            // Act
            const wrapper = shallowMount(AccountInfo, {
                i18n,
                localVue,
                propsData: { ...sutProps, isAuthFinished: false },
                store: createStore()
            });

            // Assert
            expect(initialiseSpy).not.toHaveBeenCalled();

            // Act 2
            await wrapper.setProps({ isAuthFinished: true });

            // Assert 2
            expect(initialiseSpy).toHaveBeenCalled();
        });

        it('should set `hasFormUpdate` to `false` so the form can not be resubmitted when mounted', () => {
            // Arrange & Act
            const wrapper = shallowMount(AccountInfo, {
                i18n,
                localVue,
                propsData: { ...sutProps, isAuthFinished: true }
            });

            // Assert
            expect(wrapper.vm.hasFormUpdate).toBe(false);
        });
    });

    describe('`methods`', () => {
        describe('`editConsumerDetails`', () => {
            describe('when invoked', () => {
                it('should set `hasFormUpdate` to true to indicate the form data has changed', () => {
                    // Arrange
                    const wrapper = shallowMount(AccountInfo, {
                        i18n,
                        localVue,
                        propsData: { ...sutProps, isAuthFinished: false }
                    });

                    // Act
                    wrapper.vm.editConsumerDetails();

                    // Assert
                    expect(wrapper.vm.hasFormUpdate).toBe(true);
                });
            });
        });
    });
});
