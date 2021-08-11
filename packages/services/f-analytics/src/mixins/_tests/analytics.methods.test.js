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
    });
});
