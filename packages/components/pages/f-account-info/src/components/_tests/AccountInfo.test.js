import Vuex from 'vuex';
import { shallowMount } from '@vue/test-utils';
import AccountInfo from '../AccountInfo.vue';
// eslint-disable-next-line no-unused-vars
import AccountInfoAnalyticsService from '../../services/analytics';
import AccountInfoValidationMixin from '../AccountInfoValidationMixin.vue';

import {
    localVue,
    i18n,
    baseUrl,
    token,
    consumerStateModel
} from '../../../test-utils/setup';

let wrapper;
let cookiesSpy;
let httpSpy;
let sutMocks;
let sutProps;
let dataDefaults;
let initialiseSpy;

jest.mock('../../services/analytics.js');

const logMocks = {
    info: jest.fn(),
    error: jest.fn()
};

const storeActions = {
    loadConsumerDetails: jest.fn(),
    editConsumerDetails: jest.fn()
};

const storeState = consumerStateModel;

const createStore = ({ state, actions }) => new Vuex.Store({
    modules: {
        fAccountInfoModule: {
            state,
            actions,
            namespaced: true
        }
    }
});

const mountAccountInfo = async ({
    actions = storeActions,
    state = storeState,
    mocks = sutMocks,
    propsData = sutProps,
    data = dataDefaults,
    storeOverride = null
} = {}) => {
    const store = storeOverride || createStore({ state, actions });
    initialiseSpy = jest.spyOn(AccountInfo.methods, 'initialise');

    const mock = shallowMount(AccountInfo, {
        i18n,
        localVue,
        propsData,
        data,
        store,
        mocks,
        mixins: [AccountInfoValidationMixin]
    });
    await mock.vm.$nextTick();

    await mock.vm.$nextTick();

    return mock;
};

describe('AccountInfo', () => {
    beforeEach(() => {
        // Arrange
        dataDefaults = () => ({
            hasFormUpdate: false,
            shouldShowErrorPage: false
        });
        cookiesSpy = jest.fn();
        httpSpy = jest.fn();
        sutMocks = {
            $parent: {
                $emit: jest.fn()
            },
            $http: httpSpy,
            $cookies: cookiesSpy,
            $log: logMocks
        };
        sutProps = {
            authToken: token,
            isAuthFinished: true,
            smartGatewayBaseUrl: baseUrl
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('when creating the component', () => {
        it('should register the Store Module', async () => {
            // Arrange
            wrapper = await mountAccountInfo({ storeOverride: new Vuex.Store() });

            // Assert
            expect(wrapper.vm.$store.state.fAccountInfoModule).toBeDefined();
        });
    });

    describe('when mounting the component', () => {
        it('should call the load action with the correct parameters', async () => {
            // Arrange & Act
            wrapper = await mountAccountInfo();

            // Assert
            expect(storeActions.loadConsumerDetails).toHaveBeenCalledWith(expect.any(Object), {
                api: wrapper.vm.$data.consumerApi,
                authToken: token
            });
        });

        it('should not call initialise() method if the authorisation has not completed', async () => {
            // Arrange
            sutProps = { ...sutProps, isAuthFinished: false };

            // Act
            wrapper = await mountAccountInfo();

            // Assert
            expect(initialiseSpy).not.toHaveBeenCalled();
        });

        it('should only call initialise() method once the authorisation has completed', async () => {
            // Arrange
            sutProps = { ...sutProps, isAuthFinished: false };

            // Act
            wrapper = await mountAccountInfo();

            // Assert
            expect(initialiseSpy).not.toHaveBeenCalled();

            // Act 2
            await wrapper.setProps({ isAuthFinished: true });

            // Assert 2
            expect(initialiseSpy).toHaveBeenCalled();
        });

        it('should set `hasFormUpdate` to `false` so the form can not be resubmitted when mounted', async () => {
            // Arrange & Act
            wrapper = await mountAccountInfo();

            // Assert
            expect(wrapper.vm.hasFormUpdate).toBe(false);
        });

        it('should log an info log', async () => {
            // Arrange & Act
            wrapper = await mountAccountInfo();

            // Assert
            expect(logMocks.info).toHaveBeenCalledTimes(1);
            expect(logMocks.info).toHaveBeenCalledWith(
                expect.any(String),
                expect.arrayContaining(['account-pages', 'account-info'])
            );
        });

        it('should set shouldShowErrorPage flag to true if an error occurs', async () => {
            // Arrange & Act
            const errorActions = {
                loadConsumerDetails: jest.fn().mockImplementationOnce(() => {
                    throw new Error('some-error');
                })
            };
            wrapper = await mountAccountInfo({ actions: errorActions });

            // Assert
            expect(wrapper.vm.shouldShowErrorPage).toEqual(true);
        });

        it('should not show the error card if no errors', async () => {
            // Arrange & Act
            wrapper = await mountAccountInfo();
            const element = wrapper.find('[data-test-id="account-info-error-card"]');

            // Assert
            expect(element.exists()).toEqual(false);
        });

        it('should show the error card if shouldShowErrorPage is true', async () => {
            // Arrange & Act
            wrapper = await mountAccountInfo();
            await wrapper.setData({ shouldShowErrorPage: true });
            const element = wrapper.find('[data-test-id="account-info-error-card"]');

            // Assert
            expect(element.exists()).toEqual(true);
        });

        it('should log an error if loading preferences throws an error', async () => {
            // Arrange
            const errorActions = {
                loadConsumerDetails: jest.fn().mockImplementationOnce(() => {
                    throw new Error('some-error');
                })
            };

            // Act
            wrapper = await mountAccountInfo({ actions: errorActions });

            // Assert
            expect(logMocks.error).toHaveBeenCalledTimes(1);
            expect(logMocks.error).toHaveBeenCalledWith(
                expect.any(String),
                expect.any(Error),
                expect.arrayContaining(['account-pages', 'account-info'])
            );
        });
    });

    describe('`methods`', () => {
        describe('`onFormSubmit`', () => {
            describe('form is valid', () => {
                it('address has not changed', async () => {
                    // Arrange
                    wrapper = await mountAccountInfo();
                    await wrapper.setData({ hasAddressBeenUpdated: false, hasFormUpdate: true });

                    jest.spyOn(wrapper.vm, 'isFormInvalid').mockImplementation(() => false);

                    // Act
                    wrapper.vm.onFormSubmit();

                    // Assert
                    expect(wrapper.vm.accountInfoAnalyticsService.trackFormSubmission).toHaveBeenCalledWith(false);
                });

                it('address has changed', async () => {
                    // Arrange
                    wrapper = await mountAccountInfo();
                    await wrapper.setData({ hasAddressBeenUpdated: true, hasFormUpdate: true });

                    jest.spyOn(wrapper.vm, 'isFormInvalid').mockImplementation(() => false);

                    // Act
                    wrapper.vm.onFormSubmit();

                    // Assert
                    expect(wrapper.vm.accountInfoAnalyticsService.trackFormSubmission).toHaveBeenCalledWith(true);
                });
            });
        });

        describe('`onEditConsumer`', () => {
            describe('when editing the form', () => {
                it.each([
                    ['firstName', 'Harry'],
                    ['lastName', 'Potter']
                ])('should call the Mutation correctly when changing the consumer textbox `%s` to the value `%s`', async (field, newValue) => {
                    // Arrange
                    wrapper = await mountAccountInfo();
                    const element = wrapper.find(`[data-test-id="account-info-consumer-${field}"]`);

                    // Act
                    element.vm.$emit('input', newValue);

                    // Assert
                    expect(storeActions.editConsumerDetails).toHaveBeenCalledWith(
                        expect.any(Object),
                        {
                            field,
                            value: newValue
                        }
                    );
                });

                it('should set `hasFormUpdate` to `true` to indicate the form data has changed', async () => {
                    // Arrange
                    wrapper = await mountAccountInfo();
                    await wrapper.setData({ hasFormUpdate: false });
                    const element = wrapper.find('[data-test-id="account-info-consumer-firstName"]');

                    // Act
                    element.vm.$emit('input', 'harry');

                    // Assert
                    expect(wrapper.vm.hasFormUpdate).toEqual(true);
                });

                describe('form field is part of the address', () => {
                    it.each([
                        ['line1'],
                        ['line2'],
                        ['line3'],
                        ['postcode'],
                        ['locality']
                    ])('should set `hasAddressBeenUpdated` to `true` when `field` is %s', async field => {
                        // Arrange
                        wrapper = await mountAccountInfo();

                        const element = wrapper.find(`[data-test-id="account-info-consumer-${field}"]`);

                        // Act
                        element.vm.$emit('input', 'Nice Road');

                        // Assert
                        expect(wrapper.vm.hasAddressBeenUpdated).toEqual(true);
                    });
                });

                describe('form field is not part of the address', () => {
                    it.each([
                        ['firstName'],
                        ['lastName'],
                        ['phoneNumber']
                    ])('should not set `hasAddressBeenUpdated` to `true` when `field` is %s', async field => {
                        // Arrange
                        wrapper = await mountAccountInfo();

                        const element = wrapper.find(`[data-test-id="account-info-consumer-${field}"]`);

                        // Act
                        element.vm.$emit('input', 'Harry Potter');

                        // Assert
                        expect(wrapper.vm.hasAddressBeenUpdated).toEqual(false);
                    });
                });
            });
        });

        describe('onFormSubmit ::', () => {
            it('should log an info log', async () => {
                // Act
                wrapper = await mountAccountInfo();
                await wrapper.setData({ hasFormUpdate: true });
                logMocks.info.mockClear(); // initialise has already logged info once
                await wrapper.vm.onFormSubmit();

                // Assert
                expect(logMocks.info).toHaveBeenCalledTimes(1);
                expect(logMocks.info).toHaveBeenCalledWith(
                    expect.any(String),
                    expect.arrayContaining(['account-pages', 'account-info'])
                );
            });

            // to be added in a future pr
            it.skip('should set shouldShowErrorPage flag to true if an error occurs', async () => {

            });

            // to be added in a future pr
            it.skip('should not call the save action if no changes', async () => {
            });
        });

        describe('onFormSubmit ::', () => {
            it('should log an info log', async () => {
                // Act
                wrapper = await mountAccountInfo();
                await wrapper.setData({ hasFormUpdate: true });
                logMocks.info.mockClear(); // initialise has already logged info once
                await wrapper.vm.onFormSubmit();

                // Assert
                expect(logMocks.info).toHaveBeenCalledTimes(1);
                expect(logMocks.info).toHaveBeenCalledWith(
                    expect.any(String),
                    expect.arrayContaining(['account-pages', 'account-info'])
                );
            });

            // to be added in a future pr
            it.skip('should set shouldShowErrorPage flag to true if an error occurs', async () => {

            });

            // to be added in a future pr
            it.skip('should not call the save action if no changes', async () => {
            });
        });
    });
});
