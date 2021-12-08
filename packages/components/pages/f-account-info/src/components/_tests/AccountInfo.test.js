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

    if (initialiseOverride) {
        AccountInfo.methods.initialise = initialiseOverride;
    }

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

    describe('when mounting the component', () => {
        it('should not call initialise() method if the authorisation has not completed', () => {
            // Arrange
            initialiseSpy = jest.fn();
            sutProps = { ...sutProps, isAuthFinished: false };

            // Act
            wrapper = mountAccountInfo({ initialiseOverride: initialiseSpy });

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
    });
});
