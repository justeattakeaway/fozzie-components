import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import analyticsMixin from '../analytics.mixin.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Analytics', () => {
    describe('mounted ::', () => {
        let wrapper;
        beforeEach(() => {
            // Arrange
            const component = {
                render () {},
                mixins: [analyticsMixin]
            };

            // Act
            wrapper = shallowMount(
                component,
                {
                    localVue
                }
            );
        });

        it('should be defined', () => {
            // Assert
            expect(wrapper.exists()).toBe(true);
        });
    });
});
