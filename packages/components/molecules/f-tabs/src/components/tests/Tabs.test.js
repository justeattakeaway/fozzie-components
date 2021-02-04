import { shallowMount } from '@vue/test-utils';
import VueTabs from '../Tabs.vue';

describe('Tabs', () => {
    it('should be defined', () => {
        const propsData = {};
        const wrapper = shallowMount(VueTabs, { propsData });
        expect(wrapper.exists()).toBe(true);
    });

    describe('Tabs registration', () => {
        it('should register a tab when addTab method is called', () => {

        });
        it('should display a button for each registered tab', () => {

        });
    });

    describe('Tabs selection', () => {
        it('should apply a active class to the selected tab when selectTabIndex method is called', () => {

        });
        it('should set the direction to RIGHT when new index > old index', () => {

        });
        it('should set the direction to LEFT when new index <= old index', () => {

        });
    });

});
