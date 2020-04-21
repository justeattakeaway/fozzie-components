import { shallowMount } from '@vue/test-utils';
import <%= name.component %> from '../<%= name.filename %>.vue';

describe('<%= name.filename %>', () => {
    it('should be defined', () => {
        const propsData = {};
        const wrapper = shallowMount(<%= name.component %>, { propsData });
        expect(wrapper.exists()).toBe(true);
    });
});
