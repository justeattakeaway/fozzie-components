import Vuex from 'vuex';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import { VueI18n } from '@justeat/f-globalisation';
import ContactPreferences from '../ContactPreferences.vue';
import tenantConfigs from '../../tenants';
// import {
//     STOP_LOADING_SPINNER_EVENT
// } from '../../constants';
// import {
//     baseUrl,
//     token,
//     conversationId,
//     contactPreferencesUpdateBody
// } from '../../../../test-utils/setup';

const localVue = createLocalVue();
localVue.use(VueI18n);
localVue.use(Vuex);

let wrapper;
const spinnerEventSpy = jest.fn();
const cookiesSpy = jest.fn();
const httpSpy = jest.fn();
const storeActions = {
    loadPreferences: jest.fn(),
    savePreferences: jest.fn()
};
const baseUrlMock = 'https://smartGatewayBaseUrl.com';
const authTokenMock = 'some-auth-token';

const i18n = {
    locale: 'en-GB',
    messages: {
        'en-GB': tenantConfigs['en-GB'].messages
    }
};

const storeState = {
    preferences: [],
    preferenceVersionViewed: 0
};

const sutMocks = {
    $parent: {
        $emit: spinnerEventSpy
    },
    $http: httpSpy,
    $cookies: cookiesSpy
};

const sutProps = {
    authToken: authTokenMock,
    smartGatewayBaseUrl: baseUrlMock
};

const CreateSystemUnderTest = ({
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
                    namespaced: true
                }
            }
        }),
        mocks
    });

    return sut;
};
describe('ContactPreferences', () => {
    beforeEach(() => {
        // Act
        wrapper = CreateSystemUnderTest();
    });

    describe('when mounting the component', () => {
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
            // expect(spinnerEventSpy).toHaveBeenCalledWith(STOP_LOADING_SPINNER_EVENT);
        });

        it('should filter out hidden preference and sort correctly', () => {
            // Arrange
            const newState = {
                preferenceVersionViewed: 0,
                preferences: [{
                    // This element should be first
                    key: 'orderstatus',
                    sort: 1,
                    visible: true
                }, {
                    // This element should be hidden
                    key: 'reviewmeal',
                    sort: 2,
                    visible: false
                }, {
                    // This element should be last
                    key: 'news',
                    sort: 3,
                    visible: true
                }]
            };
            const expected = [{
                key: 'orderstatus',
                sort: 1,
                visible: true
            }, {
                key: 'news',
                sort: 3,
                visible: true
            }];
            wrapper = CreateSystemUnderTest({ state: newState });

            // Act
            const actual = wrapper.vm.filteredPreferences;

            // Assert
            expect(actual).toEqual(expected);
        });

        it('should show the error page if an error occurs', () => {
            // Arrange
            const newState = {
                preferenceVersionViewed: 0,
                preferences: [] // Error - No preferences
            };
            wrapper = CreateSystemUnderTest({ state: newState });
        });
    });

    describe('when clicking a preference checkbox', () => {
        it('should call the Mutation correctly with true if previously unchecked', () => {
            // Convert to it.Each
        });

        it('should call the Mutation correctly with false if previously checked', () => {
        });
    });

    describe('when clicking the save preferences button', () => {
        it('should call the Actions with the correct parameters', () => {
        });

        it('should show the error page if and error occurs', () => {
        });
    });
});
