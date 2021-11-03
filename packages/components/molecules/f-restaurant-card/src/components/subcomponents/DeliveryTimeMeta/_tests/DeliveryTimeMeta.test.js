import { shallowMount, mount } from '@vue/test-utils';
import sut from '../DeliveryTimeMeta.vue';

describe('DeliveryTimeMeta', () => {
    it('should be defined', () => {
        // arrange
        const propsData = {
            eta: '20 - 25 min'
        };

        // act
        const wrapper = shallowMount(sut, { propsData });

        // assert
        expect(wrapper.exists()).toBe(true);
    });
    it('should show eta text when data is present', () => {
        // arrange
        const propsData = {
            eta: 'foo'
        };

        // act
        const wrapper = mount(sut, { propsData });

        const visibleText = wrapper.find('[data-test-id="icon-text-visible-text"]').text();

        // assert
        expect(visibleText).toBe('foo');
    });

    it('should fallback to distance when eta data is missing', () => {
        // arrange
        const propsData = {
            distance: 'bar'
        };

        // act
        const wrapper = mount(sut, { propsData });

        const visibleText = wrapper.find('[data-test-id="icon-text-visible-text"]').text();

        // assert
        expect(visibleText).toBe('bar');
    });

    it('should fallback to address when eta and distance data is missing', () => {
        // arrange
        const propsData = {
            address: 'baz'
        };

        // act
        const wrapper = mount(sut, { propsData });

        const visibleText = wrapper.find('[data-test-id="icon-text-visible-text"]').text();

        // assert
        expect(visibleText).toBe('baz');
    });

    it('should only show 1 Icon Text', () => {
        // arrange
        const propsData = {
            eta: 'foo',
            distance: 'bar',
            address: 'baz'
        };

        // act
        const wrapper = mount(sut, { propsData });

        const numberOfIconTextElements = wrapper.findAll('[data-test-id="icon-text-visible-text"]').length;

        // assert
        expect(numberOfIconTextElements).toBe(1);
    });
});
