import { shallowMount, config } from '@vue/test-utils';
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

    describe('Icon Visibility', () => {
        describe('Tile view', () => {
            it('should hide icon when "hideIconInTileView" is true', () => {
                // arrange
                const propsData = {
                    text: 'foo',
                    hideIconInTileView: true
                };

                const slots = { default: '<div></div>' };

                // act
                const wrapper = shallowMount(sut, { propsData, slots });

                const iconExists = wrapper.find('[data-test-id="icon-text-icon"]').exists();

                // assert
                expect(iconExists).toBe(false);
            });
        });

        describe('List view', () => {
            beforeAll(() => {
                config.provide = { isListItem: true };
            });

            afterAll(() => {
                config.provide = {};
            });

            it('should show icon when "hideIconInTileView" is true', () => {
                // arrange
                const propsData = {
                    text: 'foo',
                    hideIconInTileView: true
                };

                const slots = { default: '<div></div>' };

                // act
                const wrapper = shallowMount(sut, { propsData, slots });

                const iconExists = wrapper.find('[data-test-id="icon-text-icon"]').exists();

                // assert
                expect(iconExists).toBe(true);
            });
        });
    });
});
