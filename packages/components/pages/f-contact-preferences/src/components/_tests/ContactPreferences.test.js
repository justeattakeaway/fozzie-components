import Vuex from 'vuex';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import { VueI18n } from '@justeat/f-globalisation';
import ContactPreferences from '../ContactPreferences.vue';
import tenantConfigs from '../../tenants';
import {
    UPDATE_PREFERENCE
} from '../../constants';
import {
    contactPreferencesViewModel
} from '../../../test-utils/setup';

const localVue = createLocalVue();
localVue.use(VueI18n);
localVue.use(Vuex);

let wrapper;
let cookiesSpy;
let httpSpy;
let sutMocks;
let sutProps;
const baseUrlMock = 'https://smartGatewayBaseUrl.com';
const authTokenMock = 'some-auth-token';

const i18n = {
    locale: 'en-GB',
    messages: {
        'en-GB': tenantConfigs['en-GB'].messages
    }
};

const storeMutations = {
    [UPDATE_PREFERENCE]: jest.fn()
};

const storeActions = {
    loadPreferences: jest.fn(),
    savePreferences: jest.fn()
};

const storeState = contactPreferencesViewModel;


const mountContactPreferences = ({
    mutations = storeMutations,
    actions = storeActions,
    state = storeState,
    mocks = sutMocks,
    propsData = sutProps
} = {}) => {
    const sut = shallowMount(ContactPreferences, {
        i18n,
        localVue,
        propsData,
        store: new Vuex.Store({
            modules: {
                fContactPreferencesModule: {
                    state,
                    actions,
                    mutations,
                    namespaced: true
                }
            }
        }),
        mocks
    });

    return sut;
};

describe('ContactPreferences Component', () => {
    beforeEach(() => {
        // Arrange & Act
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
            authToken: authTokenMock,
            smartGatewayBaseUrl: baseUrlMock
        };
        wrapper = mountContactPreferences();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('when mounting the component and calling `initialise`', () => {
        it('should call the Actions with the correct parameters', () => {
            // Assert
            expect(storeActions.loadPreferences).toHaveBeenCalledWith(expect.any(Object), {
                api: {
                    baseUrl: baseUrlMock,
                    cookies: cookiesSpy,
                    httpClient: httpSpy
                },
                authToken: authTokenMock
            });
        });

        it('should set showErrorPage flag to true if an error occurs', () => {
            // Arrange
            const errorActions = {
                loadPreferences: jest.fn().mockImplementationOnce(() => {
                    throw new Error('some-error');
                })
            };
            wrapper = mountContactPreferences({ actions: errorActions });

            // Assert
            expect(wrapper.vm.showErrorPage).toEqual(true);
        });

        it('should not show the error card if no errors', () => {
            // Arrange
            const element = wrapper.find('[data-test-id="contactPreferences-error-card"]');

            // Assert
            expect(element.exists()).toEqual(false);
        });

        it('should show the error card if showErrorFlag is true', async () => {
            // Arrange
            await wrapper.setData({ showErrorPage: true });

            // Act
            const element = wrapper.find('[data-test-id="contactPreferences-error-card"]');

            // Assert
            expect(element.exists()).toEqual(true);
        });
    });

    describe('when clicking a preference checkbox', () => {
        it.each([
            [true, false],
            [false, true]
        ])('should call the Mutation correctly with %s if previously %s', async (setValue, previousValue) => {
            // Arrange
            contactPreferencesViewModel.preferences.find(e => e.key === 'news').emailValue = previousValue;
            wrapper = mountContactPreferences({ state: contactPreferencesViewModel });
            const element = wrapper.find('[data-test-id="contactPreferences-news-checkbox"]');

            // Act
            await element.setChecked(setValue);

            // Assert
            expect(storeMutations[UPDATE_PREFERENCE]).toHaveBeenCalledWith(
                wrapper.vm.$store.state.fContactPreferencesModule,
                {
                    key: 'news',
                    field: 'emailValue',
                    value: setValue
                }
            );
        });
    });

    describe('when clicking the save preferences button', () => {
        it('should call the Actions with the correct parameters', () => {
            // Act
            wrapper.vm.onFormSubmit();

            // Assert
            expect(storeActions.savePreferences).toHaveBeenCalledWith(expect.any(Object), {
                api: {
                    baseUrl: baseUrlMock,
                    cookies: cookiesSpy,
                    httpClient: httpSpy
                },
                authToken: authTokenMock
            });
        });

        it('should set showErrorPage flag to true if an error occurs', async () => {
            // Arrange
            const errorActions = {
                loadPreferences: jest.fn(),
                savePreferences: jest.fn().mockImplementationOnce(() => {
                    throw new Error('some-error');
                })
            };
            await wrapper.setData({ showErrorPage: false });
            wrapper = mountContactPreferences({ actions: errorActions });

            // Act
            wrapper.vm.onFormSubmit();

            // Assert
            expect(wrapper.vm.showErrorPage).toEqual(true);
        });
    });
});
