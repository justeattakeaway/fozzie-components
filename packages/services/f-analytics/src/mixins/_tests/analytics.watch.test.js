import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import analyticsMixin from '../analytics.mixin.vue';
import {
    createStore
} from './helpers/setup';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

describe('Analytics', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('watch ::', () => {
        let component;
        let prepareAnalyticsMock;
        let pushAnalyticsMock;
        beforeEach(() => {
            // Arrange
            component = {
                render () {},
                mixins: [analyticsMixin],
                store: createStore()
            };
            component.mixins[0].created = jest.fn(() => true);
            prepareAnalyticsMock = jest.spyOn(component.mixins[0].methods, 'prepareAnalytics').mockImplementation(() => true);
            pushAnalyticsMock = jest.spyOn(component.mixins[0].methods, 'pushAnalytics').mockImplementation(() => true);
        });

        it('should call prepareAnalytics & pushAnalytics when route changes', async () => {
            // Arrange
            const router = new VueRouter({ routes: [{ path: '/my-new-page', name: 'my-new-page' }] });
            shallowMount(
                component,
                {
                    localVue,
                    router
                }
            );

            // Act
            router.push({ name: 'my-new-page' });

            // Assert
            expect(prepareAnalyticsMock).toHaveBeenCalled();
            expect(pushAnalyticsMock).toHaveBeenCalled();
        });
    });
});
