import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import {
    createStore,
    $route,
    $i18n,
    $cookies
} from '@/tests/helpers/setup';
import * as utils from '@/utils/helpers';
import analyticModule from '@/store/analytics.module';
import analyticsMixin from '../analytics.mixin.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

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

const userIdFromCookie = 'fjdhskgshjgk';

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

describe('Analytics', () => {
    describe('methods ::', () => {
        describe('pushUserData ::', () => {
            const component = {
                render () {},
                mixins: [analyticsMixin]
            };
            let wrapper;
            let windowsPushSpy;
            component.mixins[0].created = jest.fn(() => true);

            beforeEach(() => {
                // Arrange - window state
                windowsPushSpy = jest.fn();
                const originalWindow = { ...window };
                jest.spyOn(global, 'window', 'get').mockImplementation(() => ({
                    ...originalWindow,
                    dataLayer: {
                        push: windowsPushSpy
                    }
                }));
                // Arrange - sut
                wrapper = shallowMount(component, {
                    mixins: [analyticsMixin],
                    localVue,
                    store: createStore(),
                    mocks: {
                        $i18n,
                        $cookies
                    }
                });
                // Arrange - cookies
                wrapper.vm.$cookies.get.mockReturnValue(userIdFromCookie);
            });

            it('should not push userData to datalayer if datalayer not present', async () => {
                // Arrange
                windowsPushSpy = jest.fn();
                const originalWindow = { ...window };
                const windowSpy = jest.spyOn(global, 'window', 'get');
                windowSpy.mockImplementation(() => ({
                    ...originalWindow,
                    dataLayer: {
                        push: windowsPushSpy
                    }
                }));
                windowSpy.mockImplementation(() => ({
                    ...originalWindow,
                    dataLayer: undefined
                }));

                // Act
                await wrapper.vm.pushUserData();

                // Assert
                expect(windowsPushSpy).not.toHaveBeenCalled();
            });

            it('should push userData to datalayer only with userId if authToken has not been passed', async () => {
                // Act
                await wrapper.vm.pushUserData();

                // Assert
                expect(windowsPushSpy).toHaveBeenCalledWith({ userData: { ...userDataWithoutMockAuthToken } });
            });

            describe('if authToken has been passed', () => {
                describe('and user is logged in', () => {
                    it('should push userData to datalayer with registered auth token details', async () => {
                        // Act
                        await wrapper.vm.pushUserData(mockAuthTokenRegistered);

                        // Assert
                        expect(windowsPushSpy).toHaveBeenCalledWith({ userData: { ...userDataWithMockAuthTokenRegistered } });
                    });
                });

                describe('and user is a guest', () => {
                    it('should push userData to datalayer with guest auth token details', async () => {
                        // Act
                        await wrapper.vm.pushUserData(mockAuthTokenGuest);

                        // Assert
                        expect(windowsPushSpy).toHaveBeenCalledWith({ userData: { ...userDataWithMockAuthTokenGuest } });
                    });
                });
            });
        });

        describe('updatePageData ::', () => {
            const component = {
                render () {},
                mixins: [analyticsMixin]
            };
            let wrapper;
            let windowsPushSpy;
            component.mixins[0].created = jest.fn(() => true);
            const updatePageDataSpy = jest.spyOn(component.mixins[0].methods, 'updatePageData');

            beforeEach(() => {
                // Arrange - window state
                windowsPushSpy = jest.fn();
                const originalWindow = { ...window };
                jest.spyOn(global, 'window', 'get').mockImplementation(() => ({
                    ...originalWindow,
                    dataLayer: {
                        push: windowsPushSpy
                    }
                }));
                // Arrange - sut
                wrapper = shallowMount(component, {
                    mixins: [analyticsMixin],
                    localVue,
                    store: createStore({
                        actions: analyticModule.actions,
                        mutations: analyticModule.mutations
                    }),
                    mocks: {
                        $route,
                        $i18n
                    }
                });
            });

            it('should not push pageData to datalayer if datalayer not present', async () => {
                // Arrange - window state
                windowsPushSpy = jest.fn();
                const originalWindow = { ...window };
                const windowSpy = jest.spyOn(global, 'window', 'get');
                windowSpy.mockImplementation(() => ({
                    ...originalWindow,
                    dataLayer: {
                        push: windowsPushSpy
                    }
                }));
                windowSpy.mockImplementation(() => ({
                    ...originalWindow,
                    dataLayer: undefined
                }));

                // Act
                await wrapper.vm.pushPageData();

                // Assert
                expect(windowsPushSpy).not.toHaveBeenCalled();
            });

            it('should set the correct pageData', async () => {
                // Arrange
                const expected = {
                    ...basePageDataObject
                };
                jest.spyOn(utils, 'getDisplaySize').mockImplementation(() => expected.display);
                jest.spyOn(utils, 'getOrientation').mockImplementation(() => expected.orientation);
                jest.spyOn(utils, 'mapRouteToGroup').mockImplementation(() => expected.group);
                jest.spyOn(utils, 'mapRouteToFeature').mockImplementation(() => expected.name);

                // Act
                await wrapper.vm.pushPageData();

                // Assert
                expect(updatePageDataSpy).toHaveBeenCalledWith(expected);
                expect(windowsPushSpy).toHaveBeenCalledWith({ pageData: { ...expected } });
            });

            it('should override name attribute when name = Checkout 1 Overview and no authToken', async () => {
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
                await wrapper.vm.pushPageData();

                // Assert
                expect(updatePageDataSpy).toHaveBeenCalledWith(expected);
                expect(windowsPushSpy).toHaveBeenCalledWith({ pageData: { ...expected } });
            });

            it('should not override name attribute when name = Checkout 1 Overview and authToken', async () => {
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
                await wrapper.vm.pushPageData({ authToken: mockAuthToken });

                // Assert
                expect(updatePageDataSpy).toHaveBeenCalledWith(expected);
                expect(windowsPushSpy).toHaveBeenCalledWith({ pageData: { ...expected } });
            });

            it('should add conversationId and requestId values when passed in param object', async () => {
                // Arrange
                const expected = {
                    ...basePageDataObject,
                    conversationId: '460cc3a8-83f7-4e80-bb46-c8a69967f249',
                    requestId: '6cbe6509-9122-4e66-a90a-cc483c34282e'
                };
                jest.spyOn(utils, 'getDisplaySize').mockImplementation(() => expected.display);
                jest.spyOn(utils, 'getOrientation').mockImplementation(() => expected.orientation);
                jest.spyOn(utils, 'mapRouteToGroup').mockImplementation(() => expected.group);
                jest.spyOn(utils, 'mapRouteToFeature').mockImplementation(() => expected.name);

                // Act
                await wrapper.vm.pushPageData({ conversationId: expected.conversationId, requestId: expected.requestId });

                // Assert
                expect(updatePageDataSpy).toHaveBeenCalledWith(expected);
                expect(windowsPushSpy).toHaveBeenCalledWith({ pageData: { ...expected } });
            });
        });
    });
});

