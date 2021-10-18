import { shallowMount } from '@vue/test-utils';
import ContactPreferences from '../ContactPreferences.vue';

describe('ContactPreferences', () => {
    it('should be defined', () => {
        const propsData = {};
        const wrapper = shallowMount(ContactPreferences, { propsData });
        expect(wrapper.exists()).toBe(true);
    });
});
