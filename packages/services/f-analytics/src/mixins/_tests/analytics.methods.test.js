import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import analyticsMixin from '../analytics.mixin.vue';
import {
    createStore,
    $route,
    $i18n,
    $cookies
} from '../../tests/helpers/setup';

import { MAP_ROUTE_TO_FEATURE_NAME } from '../../constants';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Analytics', () => {
    describe('methods ::', () => {
        // 1 == locale, 2 == branding, 3 == country, 4 == currency, 5 == language
        const cases = [
            ['en-GB', 'justeat', 'uk', 'gbp', 'en'],
            ['en-IE', 'justeat', 'ie', 'eur', 'en'],
            ['it-IT', 'justeat', 'it', 'eur', 'it'],
            ['es-ES', 'justeat', 'es', 'eur', 'es'],
            ['en-AU', 'menulog', 'au', 'aud', 'en'],
            ['en-NZ', 'menulog', 'nz', 'nzd', 'en']
        ];
        describe('preparePlatformData ::', () => {
            let component;
            let pushPlatformDataSpy;

            beforeEach(() => {
                component = {
                    render () {},
                    mixins: [analyticsMixin],
                    computed: {
                        isServer () {
                            return false;
                        }
                    }
                };

                component.mixins[0].created = jest.fn(() => true);
                pushPlatformDataSpy = jest.spyOn(component.mixins[0].methods, 'pushPlatformData').mockImplementationOnce(() => true);
            });

            test.each(cases)(
                'should set the correct plaformData given %p as the locale',
                (localeArg, brandingExpected, countryExpected, currencyExpected, languageExpected) => {
                    // Arrange
                    const expected = {
                        appType: 'web',
                        applicationId: 7,
                        branding: brandingExpected,
                        country: countryExpected,
                        currency: currencyExpected,
                        environment: 'localhost',
                        instancePosition: 'N/A',
                        jeUserPercentage: undefined,
                        language: languageExpected,
                        name: MAP_ROUTE_TO_FEATURE_NAME[$route.name] || $route.name,
                        userAgent: navigator.userAgent,
                        version: '0.0.0.0'
                    };

                    $i18n.locale = localeArg;

                    const wrapper = shallowMount(
                        component,
                        {
                            localVue,
                            store: createStore(),
                            mocks:
                            {
                                $route,
                                $i18n
                            }
                        }
                    );

                    // Act
                    wrapper.vm.preparePlatformData();

                    // Assert
                    expect(pushPlatformDataSpy).toHaveBeenCalledWith(expected);
                }
            );
        });

        describe('prepareUserData ::', () => {
            const userIdFromCookie = 'fjdhskgshjgk';

            const mockAuthTokenRegistered = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.'
            + 'eyJlbWFpbCI6ImpvZS5ibG9nZ3NAanVzdGVhdHRha2Vhd2F5LmNvbS'
            + 'IsImNyZWF0ZWRfZGF0ZSI6IjIwMjEtMDItMDhUMTA6Mjc6NDkuMTkz'
            + 'MDAwMFoiLCJuYW1lIjoiSm9lIEJsb2dncyIsImdsb2JhbF91c2VyX2lkI'
            + 'joiVTdOUkFsV0FnNXpPZHNkUmdmN25rVHlvaTkwWEVvPSIsImdpdmVuX25h'
            + 'bWUiOiJKb2UiLCJmYW1pbHlfbmFtZSI6IkJsb2dncyIsImlhdCI6MTYxNTQ2OTUxNn0.VapH6uHnn4lHIkvN_mS9A9IVVWL0YPNE39gDDD-l7SU';

            const mockAuthTokenGuest = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.'
            + 'eyJlbWFpbCI6ImpvZS5ibG9nZ3NAanVzdGVhdHRha2Vhd2F5LmNvbSIsImNyZ'
            + 'WF0ZWRfZGF0ZSI6IjIwMjEtMDItMDhUMTA6Mjc6NDkuMTkzMDAwMFoiLCJuYW'
            + '1lIjoiSm9lIEJsb2dncyIsImdsb2JhbF91c2VyX2lkIjoiVTdOUkFsV0FnNXp'
            + 'PZHNkUmdmN25rVHlvaTkwWEVvPSIsImdpdmVuX25hbWUiOiJKb2UiLCJmYW1p'
            + 'bHlfbmFtZSI6IkJsb2dncyIsInN1YiI6IjEyMzQ1Iiwicm9sZSI6Ikd1ZXN0Ii'
            + 'wiaWF0IjoxNjE1NDY5NTE2fQ.ngfAKpiMH4Gk0Y4gAVC4KeLadWFtVXx4hD1_BSW9SN0';

            const userDataWithMockAuthTokenRegistered = {
                'a-UserId': userIdFromCookie,
                authType: 'Login',
                email: '1a9a31f72fbb57efd148bbfe06c169b97f6868200b422a5ae7fed7e3f853002a',
                globalUserId: 'U7NRAlWAg5zOdsdRgf7nkTyoi90XEo=',
                signinType: 'Email',
                signupDate: '2021-02-08T10:27:49.1930000Z'
            };

            const userDataWithMockAuthTokenGuest = {
                'a-UserId': userIdFromCookie,
                authType: 'Login',
                email: '1a9a31f72fbb57efd148bbfe06c169b97f6868200b422a5ae7fed7e3f853002a',
                globalUserId: 'U7NRAlWAg5zOdsdRgf7nkTyoi90XEo=',
                signinType: 'Guest',
                signupDate: '2021-02-08T10:27:49.1930000Z'
            };

            const userDataWithoutMockAuthToken = {
                'a-UserId': userIdFromCookie,
                authType: undefined,
                email: undefined,
                globalUserId: undefined,
                signinType: undefined,
                signupDate: undefined
            };

            const component = {
                render () {},
                mixins: [analyticsMixin]
            };
            let wrapper;

            component.mixins[0].created = jest.fn(() => true);
            const pushUpdateUserDataSpy = jest.spyOn(component.mixins[0].methods, 'pushUserData');

            beforeEach(() => {
                wrapper = shallowMount(component, {
                    mixins: [analyticsMixin],
                    localVue,
                    store: createStore(),
                    mocks: {
                        $i18n,
                        $cookies
                    }
                });

                wrapper.vm.$cookies.get.mockReturnValue(userIdFromCookie);
            });

            it('should call `updateUserData` action only with userId if authToken has not been passed', () => {
                // Act
                wrapper.vm.prepareUserData();

                // Assert
                expect(pushUpdateUserDataSpy).toHaveBeenCalledWith(userDataWithoutMockAuthToken);
            });

            describe('if authToken has been passed', () => {
                describe('and user is logged in', () => {
                    it('should call `updateUserData` action with `userDataWithMockAuthTokenRegistered`', () => {
                        // Act
                        wrapper.vm.prepareUserData(mockAuthTokenRegistered);

                        // Assert
                        expect(pushUpdateUserDataSpy).toHaveBeenCalledWith(userDataWithMockAuthTokenRegistered);
                    });
                });

                describe('and user is a guest', () => {
                    it('should call `updateUserData` action with `userDataWithMockAuthTokenGuest`', () => {
                        // Act
                        wrapper.vm.prepareUserData(mockAuthTokenGuest);

                        // Assert
                        expect(pushUpdateUserDataSpy).toHaveBeenCalledWith(userDataWithMockAuthTokenGuest);
                    });
                });
            });
        });
    });
});
