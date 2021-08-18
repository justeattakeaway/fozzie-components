import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import {
    createStore,
    $route,
    $i18n,
    authTokenRegistered
} from '@/tests/helpers/setup';
import * as utils from '@/utils/helpers';
import analyticModule from '@/store/analytics.module';
import analyticsMixin from '../analytics.mixin.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

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
        describe('preparePageData ::', () => {
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
                await wrapper.vm.pushPageData({ authToken: authTokenRegistered });

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
