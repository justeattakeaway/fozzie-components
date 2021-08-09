import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import analyticsMixin from '../analytics.mixin.vue';
import * as utils from '../../utils/helpers';
import {
    createStore,
    $route,
    $i18n
} from '../../tests/helpers/setup';

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
        describe('preparePlatformData ::', () => {
            let component;
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
                storeUpdatePlatformDataSpy = jest.spyOn(component.mixins[0].methods, 'updatePlatformData');
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
                        environment: '',
                        instancePosition: '',
                        jeUserPercentage: undefined,
                        language: languageExpected,
                        name: 'test-feature-name',
                        userAgent: navigator.userAgent,
                        version: ''
                    };

                    jest.spyOn(utils, 'mapRouteToFeature').mockImplementation(() => expected.name);

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
                    expect(storeUpdatePlatformDataSpy).toHaveBeenCalledWith(expected);
                }
            );
        });

        describe('preparePageData ::', () => {
            const mockAuthToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.'
            + 'eyJlbWFpbCI6ImpvZS5ibG9nZ3NAanVzdGVhdHRha2Vhd2F5LmNvbS'
            + 'IsImNyZWF0ZWRfZGF0ZSI6IjIwMjEtMDItMDhUMTA6Mjc6NDkuMTkz'
            + 'MDAwMFoiLCJuYW1lIjoiSm9lIEJsb2dncyIsImdsb2JhbF91c2VyX2lkI'
            + 'joiVTdOUkFsV0FnNXpPZHNkUmdmN25rVHlvaTkwWEVvPSIsImdpdmVuX25h'
            + 'bWUiOiJKb2UiLCJmYW1pbHlfbmFtZSI6IkJsb2dncyIsImlhdCI6MTYxNTQ2OTUxNn0.VapH6uHnn4lHIkvN_mS9A9IVVWL0YPNE39gDDD-l7SU';

            const basePageDataObject = {
                name: 'test-route-name',
                group: 'test-group',
                httpStatusCode: 0,
                isCached: false,
                conversationId: '',
                requestId: '',
                orientation: 'Landscape',
                display: 'full-size'
            };

            const component = {
                render () {},
                mixins: [analyticsMixin]
            };
            let wrapper;

            component.mixins[0].created = jest.fn(() => true);
            const storeUpdatePageDataSpy = jest.spyOn(component.mixins[0].methods, 'updatePageData');

            beforeEach(() => {
                wrapper = shallowMount(component, {
                    mixins: [analyticsMixin],
                    localVue,
                    store: createStore(),
                    mocks: {
                        $route,
                        $i18n
                    }
                });
            });
            it('should should set the correct pageData', () => {
                // Arrange
                const expected = {
                    ...basePageDataObject
                };
                jest.spyOn(utils, 'getDisplaySize').mockImplementation(() => expected.display);
                jest.spyOn(utils, 'getOrientation').mockImplementation(() => expected.orientation);
                jest.spyOn(utils, 'mapRouteToGroup').mockImplementation(() => expected.group);
                jest.spyOn(utils, 'mapRouteToFeature').mockImplementation(() => expected.name);

                // Act
                wrapper.vm.preparePageData();

                // Assert
                expect(storeUpdatePageDataSpy).toHaveBeenCalledWith(expected);
            });

            it('should override name attribute when name = Checkout 1 Overview and no authToken', () => {
                // Arrange
                const expected = {
                    ...basePageDataObject,
                    name: 'Checkout 1 Guest'
                };
                jest.spyOn(utils, 'getDisplaySize').mockImplementation(() => expected.display);
                jest.spyOn(utils, 'getOrientation').mockImplementation(() => expected.orientation);
                jest.spyOn(utils, 'mapRouteToGroup').mockImplementation(() => expected.group);
                jest.spyOn(utils, 'mapRouteToFeature').mockImplementation(() => 'Checkout 1 Overview');

                // Act
                wrapper.vm.preparePageData();

                // Assert
                expect(storeUpdatePageDataSpy).toHaveBeenCalledWith(expected);
            });

            it('should not override name attribute when name = Checkout 1 Overview and authToken', () => {
                // Arrange
                const expected = {
                    ...basePageDataObject,
                    name: 'Checkout 1 Overview'
                };
                jest.spyOn(utils, 'getDisplaySize').mockImplementation(() => expected.display);
                jest.spyOn(utils, 'getOrientation').mockImplementation(() => expected.orientation);
                jest.spyOn(utils, 'mapRouteToGroup').mockImplementation(() => expected.group);
                jest.spyOn(utils, 'mapRouteToFeature').mockImplementation(() => expected.name);

                // Act
                wrapper.vm.preparePageData({ authToken: mockAuthToken });

                // Assert
                expect(storeUpdatePageDataSpy).toHaveBeenCalledWith(expected);
            });
        });
    });
});
