import Vuex from 'vuex';
import { shallowMount } from '@vue/test-utils';
import AccountInfo from '../AccountInfo.vue';
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
let pushEventSpy;
let sutMocks;
let sutProps;
let dataDefaults;
let initialiseSpy;
let windowSpy;
let windowCopy;
let windowMock;

const GetWindowMock = () => {
    windowCopy = { ...global.window };
    windowMock = ({
        ...windowCopy,
        location: {
            pathname: '/account/info'
        }
    });
    windowSpy = jest.spyOn(global, 'window', 'get');
    windowSpy.mockImplementation(() => windowMock);
};

const logMocks = {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn()
};

const storeActions = {
    loadConsumerDetails: jest.fn(),
    editConsumerDetails: jest.fn(),
    saveConsumerDetails: jest.fn()
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

    return mock;
};

describe('AccountInfo', () => {
    beforeEach(() => {
        // Arrange
        dataDefaults = () => ({
            hasFormUpdate: false,
            shouldShowLoadErrorCard: false
        });
        cookiesSpy = jest.fn();
        httpSpy = jest.fn();
        pushEventSpy = jest.fn();

        sutMocks = {
            $parent: {
                $emit: jest.fn()
            },
            $http: httpSpy,
            $cookies: cookiesSpy,
            $log: logMocks,
            $route: {
                fullPath: '/account/info'
            },
            $gtm: {
                pushEvent: pushEventSpy
            },
            window: GetWindowMock()
        };
        sutProps = {
            authToken: token,
            isAuthFinished: true,
            smartGatewayBaseUrl: baseUrl,
            loginPath: '/account/login'
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('when creating the component', () => {
        it('should register the Store Module', async () => {
            // Arrange & Act
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

        it('should set shouldShowLoadErrorCard flag to true if an error occurs', async () => {
            // Arrange
            const errorActions = {
                ...storeActions,
                loadConsumerDetails: jest.fn().mockImplementationOnce(() => {
                    throw new Error('some-error');
                })
            };

            // Act
            wrapper = await mountAccountInfo({ actions: errorActions });

            // Assert
            expect(wrapper.vm.shouldShowLoadErrorCard).toEqual(true);
        });

        it('should not show the error card if no errors', async () => {
            // Arrange & Act
            wrapper = await mountAccountInfo();
            const element = wrapper.find('[data-test-id="account-info-error-card"]');

            // Assert
            expect(element.exists()).toEqual(false);
        });

        it('should show the error card if shouldShowLoadErrorCard is true', async () => {
            // Arrange & Act
            wrapper = await mountAccountInfo();
            await wrapper.setData({ shouldShowLoadErrorCard: true });
            const element = wrapper.find('[data-test-id="account-info-error-card"]');

            // Assert
            expect(element.exists()).toEqual(true);
        });

        it('should log an error if loading user data throws an error', async () => {
            // Arrange
            const errorActions = {
                ...storeActions,
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

        it('should log warning and redirect if 403', async () => {
            // Arrange
            const err = new Error('TEST - 403 error');
            err.response = {
                status: 403
            };
            const errorActions = {
                ...storeActions,
                loadConsumerDetails: jest.fn().mockImplementationOnce(() => { throw err; })
            };

            // Act
            wrapper = await mountAccountInfo({ actions: errorActions });

            // Assert
            expect(logMocks.warn).toHaveBeenCalledTimes(1);
            expect(logMocks.warn).toHaveBeenCalledWith(
                'Unauthenticated fetching consumer details',
                err,
                expect.arrayContaining(['account-pages', 'account-info'])
            );
            expect(windowMock.location.href).toBe('/account/login?returnurl=/account/info');
        });

        it('should log error and not redirect if 403 and no loginPath supplied', async () => {
            // Arrange
            const propsData = {
                ...sutProps,
                loginPath: null
            };
            const err = new Error('TEST - 403 error');
            err.response = {
                status: 403
            };
            const errorActions = {
                ...storeActions,
                loadConsumerDetails: jest.fn().mockImplementationOnce(() => { throw err; })
            };

            // Act
            wrapper = await mountAccountInfo({ actions: errorActions, propsData });

            // Assert
            expect(logMocks.error).toHaveBeenCalledTimes(1);
            expect(logMocks.error).toHaveBeenCalledWith(
                'Error fetching consumer details',
                err,
                expect.arrayContaining(['account-pages', 'account-info'])
            );
            expect(windowMock.location.href).toBeUndefined();
        });

        it('should contain the correct url to change password', async () => {
            // Arrange & Act
            wrapper = await mountAccountInfo();
            const element = wrapper.find('[data-test-id="account-info-change-password-button"]');

            // Assert
            expect(element.attributes('href')).toBe('/account/change-password?returnUrl=%2Faccount%2Finfo');
        });
    });

    describe('`methods`', () => {
        describe('`onEditConsumer`', () => {
            describe('when editing the form', () => {
                it.each([
                    ['firstName', 'Harry'],
                    ['lastName', 'Potter']
                ])('should call the Mutation correctly when changing the consumer textbox `%s` to the value `%s`', async (field, newValue) => {
                    // Arrange
                    wrapper = await mountAccountInfo();
                    const element = wrapper.find(`[name="account-info-consumer-${field}"]`);

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
                    const element = wrapper.find('[name="account-info-consumer-firstName"]');

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

                        const element = wrapper.find(`[name="account-info-consumer-${field}"]`);

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

                        const element = wrapper.find(`[name="account-info-consumer-${field}"]`);

                        // Act
                        element.vm.$emit('input', 'Harry Potter');

                        // Assert
                        expect(wrapper.vm.hasAddressBeenUpdated).toEqual(false);
                    });
                });
            });
        });

        describe('onFormSubmit ::', () => {
            it('should call the save action with the correct parameters', async () => {
                // Arrange
                wrapper = await mountAccountInfo();
                await wrapper.setData({ hasFormUpdate: true });

                // Act
                await wrapper.vm.onFormSubmit();

                // Assert
                expect(storeActions.saveConsumerDetails).toHaveBeenCalledWith(expect.any(Object), {
                    api: wrapper.vm.$data.consumerApi,
                    authToken: token
                });
            });

            it('should log an info log', async () => {
                // Arrange
                wrapper = await mountAccountInfo();
                await wrapper.setData({ hasFormUpdate: true });
                logMocks.info.mockClear(); // initialise has already logged info once

                // Act
                await wrapper.vm.onFormSubmit();

                // Assert
                expect(logMocks.info).toHaveBeenCalledTimes(1);
                expect(logMocks.info).toHaveBeenCalledWith(
                    expect.any(String),
                    expect.arrayContaining(['account-pages', 'account-info'])
                );
            });

            it('should set shouldShowSaveErrorAlert flag to true if a save error occurs', async () => {
                // Arrange
                const errorActions = {
                    ...storeActions,
                    saveConsumerDetails: jest.fn().mockImplementationOnce(() => {
                        throw new Error('some-error');
                    })
                };
                wrapper = await mountAccountInfo({ actions: errorActions });
                await wrapper.setData({ hasFormUpdate: true });

                // Act
                await wrapper.vm.onFormSubmit();

                // Assert
                expect(wrapper.vm.shouldShowSaveErrorAlert).toEqual(true);
            });

            it('should not call the save action if no changes', async () => {
                // Arrange
                wrapper = await mountAccountInfo();
                await wrapper.setData({ hasFormUpdate: false });

                // Act
                await wrapper.vm.onFormSubmit();

                // Assert
                expect(storeActions.saveConsumerDetails).not.toHaveBeenCalledWith();
            });

            it('should set shouldShowSaveErrorAlert flag to true if a save error occurs', async () => {
                // Arrange
                const errorActions = {
                    ...storeActions,
                    saveConsumerDetails: jest.fn().mockImplementationOnce(() => {
                        throw new Error('some-error');
                    })
                };
                wrapper = await mountAccountInfo({ actions: errorActions });
                await wrapper.setData({ hasFormUpdate: true });

                // Act
                await wrapper.vm.onFormSubmit();

                // Assert
                expect(wrapper.vm.shouldShowSaveErrorAlert).toEqual(true);
            });

            describe('publishing analytics', () => {
                describe('form is valid', () => {
                    it('address has not changed', async () => {
                        // Arrange
                        wrapper = await mountAccountInfo();
                        await wrapper.setData({ hasAddressBeenUpdated: false, hasFormUpdate: true });

                        // Act
                        await wrapper.vm.onFormSubmit();

                        // Assert
                        expect(pushEventSpy).toMatchSnapshot();
                    });

                    it('address has changed', async () => {
                        // Arrange
                        wrapper = await mountAccountInfo();
                        await wrapper.setData({ hasAddressBeenUpdated: true, hasFormUpdate: true });

                        // Act
                        await wrapper.vm.onFormSubmit();

                        // Assert
                        expect(pushEventSpy).toMatchSnapshot();
                    });
                });
            });
        });
    });
});
