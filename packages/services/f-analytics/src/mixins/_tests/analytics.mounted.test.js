import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import analyticsMixin from '../analytics.mixin.vue';
import {
    createStore,
    $cookies
} from '../../tests/helpers/setup';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

describe('Analytics', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('mounted ::', () => {
        let prepareAnalyticsMock;

        beforeEach(() => {
            // Arrange
            const component = {
                render () {},
                mixins: [analyticsMixin],
                store: createStore()
            };
            component.mixins[0].created = jest.fn(() => true);
            prepareAnalyticsMock = jest.spyOn(component.mixins[0].methods, 'prepareAnalytics').mockImplementationOnce(() => true);

            // Act
            shallowMount(
                component,
                {
                    localVue,
                    mocks: {
                        $cookies
                    }
                }
            );
        });

        it('should make a call to prepareAnalytics', () => {
            // Assert
            expect(prepareAnalyticsMock).toHaveBeenCalled();
        });
    });
});
