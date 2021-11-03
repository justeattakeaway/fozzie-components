import { shallowMount } from '@vue/test-utils';
import DeliveryTimeMeta from '../subcomponents/DeliveryTimeMeta.vue';

describe('DeliveryTimeMeta', () => {
    it('should be defined', () => {
        // arrange
        const propsData = {
            eta: '20 - 25 min'
        };

        // act
        const wrapper = shallowMount(DeliveryTimeMeta, { propsData });

        // assert
        expect(wrapper.exists()).toBe(true);
    });
});
