import Vuex from 'vuex';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import { VueI18n } from '@justeat/f-globalisation';
import ContactPreferences from '../ContactPreferences.vue';
import tenantConfigs from '../../tenants';
import {
    contactPreferencesViewModel,
    baseUrl,
    token
} from '../../../test-utils/setup';

const localVue = createLocalVue();
localVue.use(VueI18n);
localVue.use(Vuex);

let wrapper;
let cookiesSpy;
let httpSpy;
let sutMocks;
let sutProps;
let dataDefaults;
let registerStoreModuleSpy;
let initialiseSpy;

const i18n = {
    locale: 'en-GB',
    messages: {
        'en-GB': tenantConfigs['en-GB'].messages
    }
};

const storeActions = {
    loadPreferences: jest.fn(),
    savePreferences: jest.fn(),
    editPreference: jest.fn()
};

const storeState = contactPreferencesViewModel;

const createStore = ({ state, actions }) => new Vuex.Store({
    modules: {
        fContactPreferencesModule: {
            state,
            actions,
            namespaced: true
        }
    }
});

const mountContactPreferences = ({
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
        ContactPreferences.methods.initialise = initialiseOverride;
    }

    const mock = shallowMount(ContactPreferences, {
        i18n,
        localVue,
        propsData,
        data,
        store,
        mocks
    });

    return mock;
};

describe('ContactPreferences Component', () => {
    beforeEach(() => {
        // Arrange & Act
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

    describe('when creating the component', () => {
        it('should register the Store Module', () => {
            // Arrange & Act
            wrapper = mountContactPreferences({ storeOverride: new Vuex.Store() });

            // Assert
            expect(registerStoreModuleSpy).toHaveBeenCalled();
        });
    });

    describe('when mounting the component and calling `initialise`', () => {
        it('should call the load action with the correct parameters', () => {
            // Arrange & Act
            wrapper = mountContactPreferences();

            // Assert
            expect(storeActions.loadPreferences).toHaveBeenCalledWith(expect.any(Object), {
                api: {
                    baseUrl,
                    cookies: cookiesSpy,
                    httpClient: httpSpy
                },
                authToken: token
            });
        });

        it('should set shouldShowErrorPage flag to true if an error occurs', () => {
            // Arrange & Act
            const errorActions = {
                loadPreferences: jest.fn().mockImplementationOnce(() => {
                    throw new Error('some-error');
                })
            };
            wrapper = mountContactPreferences({ actions: errorActions });

            // Assert
            expect(wrapper.vm.shouldShowErrorPage).toEqual(true);
        });

        it('should not show the error card if no errors', () => {
            // Arrange & Act
            wrapper = mountContactPreferences();
            const element = wrapper.find('[data-test-id="contact-preferences-error-card"]');

            // Assert
            expect(element.exists()).toEqual(false);
        });

        it('should show the error card if shouldShowErrorPage is true', async () => {
            // Arrange & Act
            wrapper = mountContactPreferences();
            await wrapper.setData({ shouldShowErrorPage: true });
            const element = wrapper.find('[data-test-id="contact-preferences-error-card"]');

            // Assert
            expect(element.exists()).toEqual(true);
        });

        it('should set the `isFormDirty` flag to false', async () => {
            // Arrange
            wrapper = mountContactPreferences();
            await wrapper.setData({ isFormDirty: true });

            // Act - re-mount the page to prove assertion
            wrapper = mountContactPreferences();

            // Assert
            expect(wrapper.vm.isFormDirty).toEqual(false);
        });

        it('should not call initialise method if the authorisation has not completed', () => {
            // Arrange
            initialiseSpy = jest.fn();
            sutProps = { ...sutProps, isAuthFinished: false };

            // Act
            wrapper = mountContactPreferences({ initialiseOverride: initialiseSpy });

            // Assert
            expect(initialiseSpy).not.toHaveBeenCalled();
        });

        it('should only call initialise method once the authorisation has completed', async () => {
            // Arrange
            initialiseSpy = jest.fn();
            sutProps = { ...sutProps, isAuthFinished: false };

            // Act
            wrapper = mountContactPreferences({ initialiseOverride: initialiseSpy });

            // Assert
            expect(initialiseSpy).not.toHaveBeenCalled();

            // Act 2
            await wrapper.setProps({ isAuthFinished: true });

            // Assert 2
            expect(initialiseSpy).toHaveBeenCalled();
        });
    });

    describe('when clicking a preferences checkbox', () => {
        it.each([
            ['news', 'email', true, false],
            ['news', 'email', false, true],
            ['news', 'sms', true, false],
            ['news', 'sms', false, true]
        ])('should call the Mutation correctly for the %s preferences %s checkbox with %s if previously %s', (preferencesKey, preferenceName, setValue, previousValue) => {
            // Arrange
            storeState.preferences.find(e => e.key === preferencesKey)[`${preferenceName}Value`] = previousValue;
            wrapper = mountContactPreferences();
            const input = wrapper.find(`[data-test-id="contact-preferences-${preferencesKey}-${preferenceName}-checkbox"]`);

            // Act
            input.vm.$emit('input', setValue);

            // Assert
            expect(storeActions.editPreference).toHaveBeenCalledWith(
                expect.any(Object),
                {
                    key: preferencesKey,
                    field: `${preferenceName}Value`,
                    value: setValue
                }
            );
        });

        it('should set the `isFormDirty` flag to true', () => {
            // Act
            wrapper = mountContactPreferences();
            const input = wrapper.find('[data-test-id="contact-preferences-news-email-checkbox"]');

            // Act
            input.vm.$emit('input', true);

            // Assert
            expect(wrapper.vm.isFormDirty).toEqual(true);
        });
    });

    describe('when clicking the save preferences button', () => {
        it('should call the save action with the correct parameters', async () => {
            // Arrange
            wrapper = mountContactPreferences();
            await wrapper.setData({ isFormDirty: true });

            // Act
            wrapper.vm.onFormSubmit();

            // Assert
            expect(storeActions.savePreferences).toHaveBeenCalledWith(expect.any(Object), {
                api: {
                    baseUrl,
                    cookies: cookiesSpy,
                    httpClient: httpSpy
                },
                authToken: token
            });
        });

        it('should not call the save action if no changes', async () => {
            // Arrange
            wrapper = mountContactPreferences();
            await wrapper.setData({ isFormDirty: false });

            // Act
            wrapper.vm.onFormSubmit();

            // Assert
            expect(storeActions.savePreferences).not.toHaveBeenCalled();
        });

        it('should set shouldShowErrorPage flag to true if an error occurs', async () => {
            // Arrange
            const errorActions = {
                loadPreferences: jest.fn(),
                savePreferences: jest.fn().mockImplementationOnce(() => {
                    throw new Error('some-error');
                })
            };
            wrapper = mountContactPreferences({ actions: errorActions });
            await wrapper.setData({ isFormDirty: true }); // Allow the data to be submitted

            // Act
            wrapper.vm.onFormSubmit();

            // Assert
            expect(wrapper.vm.shouldShowErrorPage).toEqual(true);
        });
    });
});
