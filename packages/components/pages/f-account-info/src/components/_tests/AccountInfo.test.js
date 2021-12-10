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
    });

    describe('`methods`', () => {
        describe('`editConsumerDetails`', () => {
            describe('when invoked', () => {
                it('should set `hasFormUpdate` to true to indicate the form data has changed', () => {
                    // Arrange
                    wrapper = mountAccountInfo();

                    // Act
                    wrapper.vm.editConsumerDetails();

                    // Assert
                    expect(wrapper.vm.hasFormUpdate).toBe(true);
                });
            });
        });
    });
});
