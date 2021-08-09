import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import analyticsMixin from '../analytics.mixin.vue';
import {
    createStore,
    $route,
    $i18n
} from '../../tests/helpers/setup';

import { MAP_ROUTE_TO_FEATURE_NAME } from '../../constants';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Analytics', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

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
        describe('prepareAnalytics ::', () => {
            let component;
            let prepareAnalyticsSpy;
            let storeUpdatePlatformDataSpy;

            beforeEach(() => {
                component = {
                    render () {},
                    mixins: [analyticsMixin],
                    store: createStore(),
                    computed: {
                        isServer () {
                            return false;
                        }
                    }
                };

                component.mixins[0].created = jest.fn(() => true);
                jest.spyOn(component.mixins[0].methods, 'pushAnalytics').mockImplementationOnce(() => true);
                prepareAnalyticsSpy = jest.spyOn(component.mixins[0].methods, 'prepareAnalytics');
                storeUpdatePlatformDataSpy = jest.spyOn(component.mixins[0].methods, 'updatePlatformData');
            });

            test.each(cases)(
                'should set the correct plaformData given %p as the locale',
                (localeArg, brandingExpected, countryExpected, currencyExpected, languageExpected) => {
                    // Expected
                    const expected = {
                        appType: 'web',
                        applicationId: 7,
                        branding: brandingExpected,
                        country: countryExpected,
                        currency: currencyExpected,
                        environment: '',
                        instancePosition: '',
                        jeUserPercentage: null,
                        language: languageExpected,
                        name: MAP_ROUTE_TO_FEATURE_NAME[$route.name] || $route.name,
                        userAgent: navigator.userAgent,
                        version: ''
                    };

                    $i18n.locale = localeArg;

                    // Act
                    shallowMount(
                        component,
                        {
                            localVue,
                            mocks:
                            {
                                $route,
                                $i18n
                            }
                        }
                    );

                    // Assert
                    expect(prepareAnalyticsSpy).toHaveBeenCalled();
                    expect(storeUpdatePlatformDataSpy).lastCalledWith(expected);
                }
            );
        });

        describe('pushAnalytics ::', () => {
            let pushAnalyticsSpy;
            let windowsPushMock;
            let component;

            beforeEach(() => {
                // Arrange
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
                jest.spyOn(component.mixins[0].methods, 'prepareAnalytics').mockImplementationOnce(() => true);
                windowsPushMock = jest.fn();
                window.dataLayer = {
                    push: windowsPushMock
                };
                pushAnalyticsSpy = jest.spyOn(component.mixins[0].methods, 'pushAnalytics');
            });

            it('should push the current store.platformData data to the dataLayer', () => {
                // Arrange
                const expected = {
                    platformData: {
                        applicationId: 7,
                        appType: 'web',
                        branding: 'test',
                        country: 'zu',
                        currency: 'zud',
                        environment: 'mo',
                        instancePosition: '009',
                        jeUserPercentage: 99,
                        language: 'zu',
                        name: 'test_harness',
                        userAgent: 'testweb',
                        version: '9'
                    }
                };
                component.store = createStore({ state: expected });

                // Act
                shallowMount(
                    component,
                    {
                        localVue
                    }
                );

                // Assert
                expect(pushAnalyticsSpy).toHaveBeenCalled();
                expect(windowsPushMock).lastCalledWith(expected);
            });
        });
    });
});
