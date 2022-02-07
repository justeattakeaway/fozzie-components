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

const logMocks = {
    info: jest.fn(),
    error: jest.fn()
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

const mountContactPreferences = async ({
    actions = storeActions,
    state = storeState,
    mocks = sutMocks,
    propsData = sutProps,
    data = dataDefaults,
    storeOverride = null
} = {}) => {
    const store = storeOverride || createStore({ state, actions });

    initialiseSpy = jest.spyOn(ContactPreferences.methods, 'initialise');

    const mock = shallowMount(ContactPreferences, {
        i18n,
        localVue,
        propsData,
        data,
        store,
        mocks
    });
    await mock.vm.$nextTick();

    return mock;
};

describe('ContactPreferences Component', () => {
    beforeEach(() => {
        // Arrange & Act
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
            // Arrange & Act
            wrapper = await mountContactPreferences({ storeOverride: new Vuex.Store() });

            // Assert
            expect(wrapper.vm.$store.state.fContactPreferencesModule).toBeDefined();
        });
    });

    describe('when mounting the component and calling `initialise`', () => {
        it('should call the load action with the correct parameters', async () => {
            // Arrange & Act
            wrapper = await mountContactPreferences();

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

        it('should set shouldShowErrorPage flag to true if an error occurs', async () => {
            // Arrange & Act
            const errorActions = {
                loadPreferences: jest.fn().mockImplementationOnce(() => {
                    throw new Error('some-error');
                })
            };
            wrapper = await mountContactPreferences({ actions: errorActions });

            // Assert
            expect(wrapper.vm.shouldShowLoadErrorCard).toEqual(true);
        });

        it('should not show the error card if no errors', async () => {
            // Arrange & Act
            wrapper = await mountContactPreferences();
            const element = wrapper.find('[data-test-id="contact-preferences-error-card"]');

            // Assert
            expect(element.exists()).toEqual(false);
        });

        it('should show the error card if shouldShowErrorPage is true', async () => {
            // Arrange & Act
            wrapper = await mountContactPreferences();
            await wrapper.setData({ shouldShowLoadErrorCard: true });
            const element = wrapper.find('[data-test-id="contact-preferences-error-card"]');

            // Assert
            expect(element.exists()).toEqual(true);
        });

        it('should set the `isFormDirty` flag to false', async () => {
            // Arrange
            wrapper = await mountContactPreferences();
            await wrapper.setData({ isFormDirty: true });

            // Act - re-mount the page to prove assertion
            wrapper = await mountContactPreferences();

            // Assert
            expect(wrapper.vm.isFormDirty).toEqual(false);
        });

        it('should log an info log', async () => {
            // Arrange & Act
            wrapper = await mountContactPreferences();

            // Assert
            expect(logMocks.info).toHaveBeenCalledTimes(1);
            expect(logMocks.info).toHaveBeenCalledWith(
                expect.any(String),
                expect.arrayContaining(['account-pages', 'contact-preferences'])
            );
        });

        it('should log an error if loading preferences throws an error', async () => {
            // Arrange
            const errorActions = {
                savePreferences: jest.fn(),
                loadPreferences: jest.fn().mockImplementationOnce(() => {
                    throw new Error('some-error');
                })
            };

            // Act
            wrapper = await mountContactPreferences({ actions: errorActions });

            // Assert
            expect(logMocks.error).toHaveBeenCalledTimes(1);
            expect(logMocks.error).toHaveBeenCalledWith(
                expect.any(String),
                expect.any(Error),
                expect.arrayContaining(['account-pages', 'contact-preferences'])
            );
        });

        it('should not call initialise method if the authorisation has not completed', async () => {
            // Arrange
            sutProps = { ...sutProps, isAuthFinished: false };

            // Act
            wrapper = await mountContactPreferences();

            // Assert
            expect(initialiseSpy).not.toHaveBeenCalled();
        });

        it('should only call initialise method once the authorisation has completed', async () => {
            // Arrange
            sutProps = { ...sutProps, isAuthFinished: false };

            // Act
            wrapper = await mountContactPreferences();

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
        ])('should call the Mutation correctly for the %s preferences %s checkbox with %s if previously %s', async (preferencesKey, preferenceName, setValue, previousValue) => {
            // Arrange
            storeState.preferences.find(e => e.key === preferencesKey)[`${preferenceName}Value`] = previousValue;
            wrapper = await mountContactPreferences();
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

        it('should set the `isFormDirty` flag to true', async () => {
            // Act
            wrapper = await mountContactPreferences();
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
            wrapper = await mountContactPreferences();
            await wrapper.setData({ isFormDirty: true });

            // Act
            await wrapper.vm.onFormSubmit();

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

        it('should log an info log', async () => {
            // Arrange
            wrapper = await mountContactPreferences();
            await wrapper.setData({ isFormDirty: true });
            logMocks.info.mockClear(); // initialise has already logged info once

            // Act
            await wrapper.vm.onFormSubmit();

            // Assert
            expect(logMocks.info).toHaveBeenCalledTimes(1);
            expect(logMocks.info).toHaveBeenCalledWith(
                expect.any(String),
                expect.arrayContaining(['account-pages', 'contact-preferences'])
            );
        });

        it('should set shouldShowSaveSuccessAlert flag to true and show the success alert if successful save', async () => {
            // Arrange
            wrapper = await mountContactPreferences();
            await wrapper.setData({ isFormDirty: true });

            // Act
            await wrapper.vm.onFormSubmit();

            // Assert
            expect(wrapper.vm.shouldShowSaveErrorAlert).toEqual(false);
            expect(wrapper.vm.shouldShowSuccessfulAlert).toEqual(true);
        });

        it('should not call the save action if no changes', async () => {
            // Arrange
            wrapper = await mountContactPreferences();
            await wrapper.setData({ isFormDirty: false });

            // Act
            await wrapper.vm.onFormSubmit();

            // Assert
            expect(storeActions.savePreferences).not.toHaveBeenCalled();
        });

        it('should set shouldShowSaveErrorAlert flag to true and show the error alert if save fails', async () => {
            // Arrange
            const errorActions = {
                loadPreferences: jest.fn(),
                savePreferences: jest.fn().mockImplementationOnce(() => {
                    throw new Error('some-error');
                })
            };
            wrapper = await mountContactPreferences({ actions: errorActions });
            await wrapper.setData({ isFormDirty: true }); // Allow the data to be submitted

            // Act
            await wrapper.vm.onFormSubmit();

            // Assert
            expect(wrapper.vm.shouldShowSaveErrorAlert).toEqual(true);
            expect(wrapper.vm.shouldShowSuccessfulAlert).toEqual(false);
        });

        it('should log an error message if saving preferences throws an error', async () => {
            // Arrange
            const errorActions = {
                loadPreferences: jest.fn(),
                savePreferences: jest.fn().mockImplementationOnce(() => {
                    throw new Error('some-error');
                })
            };
            wrapper = await mountContactPreferences({ actions: errorActions });
            await wrapper.setData({ isFormDirty: true });

            // Act
            await wrapper.vm.onFormSubmit();

            // Arrange
            expect(logMocks.error).toHaveBeenCalledTimes(1);
            expect(logMocks.error).toHaveBeenCalledWith(
                expect.any(String),
                expect.any(Error),
                expect.arrayContaining(['account-pages', 'contact-preferences'])
            );
        });
    });
});
