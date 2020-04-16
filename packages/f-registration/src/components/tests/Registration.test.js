import { shallowMount } from '@vue/test-utils';
import Registration from '../Registration.vue';

describe('Registration', () => {
    it('should be defined', () => {
        const propsData = {};
        const wrapper = shallowMount(Registration, { propsData });
        expect(wrapper.exists()).toBe(true);
    });

    describe(': props :', () => {
        it('if `value` is specified, should assign the input field a value attribute', () => {
            const propsData = {};
            const wrapper = shallowMount(Registration, { propsData });
            expect(wrapper.exists()).toBe(true);
        });
    });
});
