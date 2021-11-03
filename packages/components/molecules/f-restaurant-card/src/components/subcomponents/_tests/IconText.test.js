import { shallowMount } from '@vue/test-utils';
import sut from '../IconText.vue';

describe('IconText.vue', () => {
    it('displays the provided text', () => {
        // arrange
        const propsData = {
            text: 'foo'
        };

        // act
        const wrapper = shallowMount(sut, { propsData });

        const visibleText = wrapper.find('[data-test-id="icon-text-visible-text"]').text();

        // assert
        expect(visibleText).toBe('foo');
    });

    it('displays the provided accessible Text', () => {
        // arrange
        const propsData = {
            text: 'foo',
            accessibleText: 'bar'
        };

        // act
        const wrapper = shallowMount(sut, { propsData });

        const accessibleText = wrapper.find('[data-test-id="icon-text-accessible-text"]').text();

        // assert
        expect(accessibleText).toBe('bar');
    });

    it('fallbacks to text if accessible text is missing', () => {
        // arrange
        const propsData = {
            text: 'foo'
        };

        // act
        const wrapper = shallowMount(sut, { propsData });

        const accessibleText = wrapper.find('[data-test-id="icon-text-accessible-text"]').text();

        // assert
        expect(accessibleText).toBe('foo');
    });
});
