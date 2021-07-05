import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import analyticsMixin from '../analytics.mixin.vue';
import {
    createStore,
    gtmSettings,
    $route,
    $i18n
} from './helpers/setup';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Analytics', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('methods ::', () => {
        describe('preparePage ::', () => {
            let component;
            let preparePageSpy;

            beforeEach(() => {
                // Arrange
                document.head.innerHTML = '';
                component = {
                    render () {},
                    mixins: [analyticsMixin],
                    store: createStore()
                };

                component.mixins[0].created = jest.fn(() => true);
                jest.spyOn(component.mixins[0].methods, 'prepareAnalytics').mockImplementationOnce(() => true);
                jest.spyOn(component.mixins[0].methods, 'pushAnalytics').mockImplementationOnce(() => true);
                component.mixins[0].computed.isServerSide = () => false;
                preparePageSpy = jest.spyOn(component.mixins[0].methods, 'preparePage');
            });

            it('should append the GTM tag if the dataLayer is not already present', () => {
                // Arrange
                window.dataLayer = undefined;

                // Act
                shallowMount(
                    component,
                    {
                        localVue,
                        mocks: {
                            gtmSettings
                        }
                    }
                );

                // Assert
                expect(preparePageSpy).toHaveBeenCalled();
                expect(document.head.innerHTML).toContain('src="https://www.googletagmanager.com/gtm.js?id=GTM-123456A"');
                expect(document.head.innerHTML).toContain(`function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);`);
                expect(document.head.innerHTML).toContain('(window,document,\'script\',\'dataLayer\',\'GTM-123456A\');');
            });

            it('should not attempt to re-append the GTM tag if the dataLayer is already present', () => {
                // Arrange
                window.dataLayer = jest.fn();

                // Act
                shallowMount(
                    component,
                    {
                        localVue
                    }
                );

                // Assert
                expect(preparePageSpy).toHaveBeenCalled();
                expect(document.head.innerHTML).toBe('');
            });
        });

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
                jest.spyOn(component.mixins[0].methods, 'preparePage').mockImplementationOnce(() => true);
                jest.spyOn(component.mixins[0].methods, 'pushAnalytics').mockImplementationOnce(() => true);
                prepareAnalyticsSpy = jest.spyOn(component.mixins[0].methods, 'prepareAnalytics');
                storeUpdatePlatformDataSpy = jest.spyOn(component.mixins[0].methods, 'updatePlatformData');
            });

            test.each(cases)(
                'should set the correct \'plaformData\' given %p as the \'locale\'',
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
                        jeUserPercentage: 0,
                        language: languageExpected,
                        name: 'test-route-name',
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
                jest.spyOn(component.mixins[0].methods, 'preparePage').mockImplementationOnce(() => true);
                jest.spyOn(component.mixins[0].methods, 'prepareAnalytics').mockImplementationOnce(() => true);
                windowsPushMock = jest.fn();
                window.dataLayer = {
                    push: windowsPushMock
                };
                pushAnalyticsSpy = jest.spyOn(component.mixins[0].methods, 'pushAnalytics');
            });

            it('should \'push\' the current \'$store.platformData\' data to the dataLayer', () => {
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
                component.store = createStore(expected);

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
