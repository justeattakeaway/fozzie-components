import Vuex from 'vuex';
import { shallowMount } from '@vue/test-utils';
import AccountInfo from '../AccountInfo.vue';
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
let registerStoreModuleSpy;
let hasModuleSpy;
let initialiseSpy;

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

const mountAccountInfo = ({
    actions = storeActions,
    state = storeState,
    mocks = sutMocks,
    propsData = sutProps,
    data = dataDefaults,
    storeOverride = null,
    initialiseOverride = null
} = {}) => {
    const store = storeOverride || createStore({ state, actions });
    store.registerModule = registerStoreModuleSpy;
    store.hasModule = hasModuleSpy;

    AccountInfo.methods.initialise = initialiseOverride || AccountInfo.methods.initialise;

    const mock = shallowMount(AccountInfo, {
        i18n,
        localVue,
        propsData,
        data,
        store,
        mocks
    });

    return mock;
};

describe('AccountInfo', () => {
    beforeEach(() => {
        // Arrange
        registerStoreModuleSpy = jest.fn();
        hasModuleSpy = jest.fn().mockReturnValue(false);
        dataDefaults = () => ({
            isFormDirty: false,
            shouldShowErrorPage: false
        });
        cookiesSpy = jest.fn();
        httpSpy = jest.fn();
        sutMocks = {
            $parent: {
                $emit: jest.fn()
            },
            $http: httpSpy,
            $cookies: cookiesSpy
        };
        sutProps = {
            authToken: token,
            isAuthFinished: true,
            smartGatewayBaseUrl: baseUrl
        };
    });

    afterEach(() => {
        initialiseSpy = null;
        jest.clearAllMocks();
    });

    describe('when creating the component', () => {
        it('should register the Store Module', () => {
            // Arrange
            mountAccountInfo();

            // Assert
            expect(registerStoreModuleSpy).toHaveBeenCalled();
        });
    });

    describe('when mounting the component', () => {
        it('should call the load action with the correct parameters', () => {
            // Arrange & Act
            wrapper = mountAccountInfo();

            // Assert
            expect(storeActions.loadConsumerDetails).toHaveBeenCalledWith(expect.any(Object), {
                api: wrapper.vm.$data.consumerApi,
                authToken: token
            });
        });

        it('should not call initialise() method if the authorisation has not completed', () => {
            // Arrange
            initialiseSpy = jest.fn();
            sutProps = { ...sutProps, isAuthFinished: false };

            // Act
            mountAccountInfo({ initialiseOverride: initialiseSpy });

            // Assert
            expect(initialiseSpy).not.toHaveBeenCalled();
        });

        it('should only call initialise() method once the authorisation has completed', async () => {
            // Arrange
            initialiseSpy = jest.fn();
            sutProps = { ...sutProps, isAuthFinished: false };

            // Act
            wrapper = mountAccountInfo({ initialiseOverride: initialiseSpy });

            // Assert
            expect(initialiseSpy).not.toHaveBeenCalled();

            // Act 2
            await wrapper.setProps({ isAuthFinished: true });

            // Assert 2
            expect(initialiseSpy).toHaveBeenCalled();
        });

        it('should set `hasFormUpdate` to `false` so the form can not be resubmitted when mounted', () => {
            // Arrange & Act
            wrapper = mountAccountInfo();

            // Assert
            expect(wrapper.vm.hasFormUpdate).toBe(false);
        });

        it.skip('should set shouldShowErrorPage flag to true if an error occurs', () => {
            // Arrange & Act
            const errorActions = {
                loadConsumerDetails: jest.fn().mockImplementationOnce(() => {
                    console.log('loadConsumerDetails()');
                    throw new Error('some-error');
                })
            };
            wrapper = mountAccountInfo({ actions: errorActions });

            // Assert
            expect(wrapper.vm.shouldShowErrorPage).toEqual(true);
        });

        it('should not show the error card if no errors', () => {
            // Arrange & Act
            wrapper = mountAccountInfo();
            const element = wrapper.find('[data-test-id="account-info-error-card"]');

            // Assert
            expect(element.exists()).toEqual(false);
        });

        it('should show the error card if shouldShowErrorPage is true', async () => {
            // Arrange & Act
            wrapper = mountAccountInfo();
            await wrapper.setData({ shouldShowErrorPage: true });
            const element = wrapper.find('[data-test-id="account-info-error-card"]');

            // Assert
            expect(element.exists()).toEqual(true);
        });
    });

    describe('`methods`', () => {
        describe('`onEditConsumer`', () => {
            describe('when editing the form', () => {
                it.each([
                    ['firstName', 'Harry'],
                    ['lastName', 'Potter']
                ])('should call the Mutation correctly when changing the consumer textbox `%s` to the value `%s`', (field, newValue) => {
                    // Arrange
                    wrapper = mountAccountInfo();
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

                it('should set `hasFormUpdate` to true to indicate the form data has changed', async () => {
                    // Arrange
                    wrapper = mountAccountInfo();
                    await wrapper.setData({ hasFormUpdate: false });
                    const element = wrapper.find('[data-test-id="account-info-consumer-firstName"]');

                    // Act
                    element.vm.$emit('input', 'harry');

                    // Assert
                    expect(wrapper.vm.hasFormUpdate).toEqual(true);
                });
            });
        });
    });
});
