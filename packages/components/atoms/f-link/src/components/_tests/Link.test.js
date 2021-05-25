import { shallowMount } from '@vue/test-utils';
import VLink from '../Link.vue';

const $style = {
    'o-link--bold': 'o-link--bold',
    'o-link--noDecoration': 'o-link--noDecoration',
    'o-link--full': 'o-link--full',
    'o-link--noBreak': 'o-link--noBreak'
};

describe('Link', () => {
    it('should be defined', () => {
        // Arrange
        const propsData = { };

        // Act
        const wrapper = shallowMount(VLink, {
            propsData
        });

        // Assert
        expect(wrapper.exists()).toBe(true);
    });

    describe('props :: ', () => {
        describe('isBold :: ', () => {
            it('should apply `o-link--bold` class to link if true', () => {
                // Arrange
                const propsData = {
                    isBold: true
                };

                // Act
                const wrapper = shallowMount(VLink, {
                    propsData,
                    mocks: {
                        $style
                    }
                });

                const link = wrapper.find('[data-test-id="link-component"]');

                // Assert
                expect(link.attributes('class')).toContain('o-link--bold');
            });
        });

        describe('hasTextDecoration :: ', () => {
            it('should apply `o-link--noDecoration` class to link if false', () => {
                // Arrange
                const propsData = {
                    hasTextDecoration: false
                };

                // Act
                const wrapper = shallowMount(VLink, {
                    propsData,
                    mocks: {
                        $style
                    }
                });

                const link = wrapper.find('[data-test-id="link-component"]');

                // Assert
                expect(link.attributes('class')).toContain('o-link--noDecoration');
            });
        });

        describe('isFullWidth :: ', () => {
            it('should apply `o-link--full` class to link if true', () => {
                // Arrange
                const propsData = {
                    isFullWidth: true
                };

                // Act
                const wrapper = shallowMount(VLink, {
                    propsData,
                    mocks: {
                        $style
                    }
                });

                const link = wrapper.find('[data-test-id="link-component"]');

                // Assert
                expect(link.attributes('class')).toContain('o-link--full');
            });
        });

        describe('noLineBreak :: ', () => {
            it('should apply `o-link--noBreak` class to link if true', () => {
                // Arrange
                const propsData = {
                    noLineBreak: true
                };

                // Act
                const wrapper = shallowMount(VLink, {
                    propsData,
                    mocks: {
                        $style
                    }
                });

                const link = wrapper.find('[data-test-id="link-component"]');

                // Assert
                expect(link.attributes('class')).toContain('o-link--noBreak');
            });
        });
    });

    describe('computed :: ', () => {
        describe('ariaDescription :: ', () => {
            const newLocationMessage = 'Opens in a new window/screen/tab';
            const externalLinkMessage = 'Opens an external site in a new window/screen/tab';

            it.each([
                [null, 'default'],
                [newLocationMessage, 'newLocation'],
                [externalLinkMessage, 'external']
            ])('should return `%s` when `linkType` is %s', (expected, linkType) => {
                // Arrange
                const propsData = {
                    linkType
                };

                // Act
                const wrapper = shallowMount(VLink, {
                    propsData
                });

                // Assert
                expect(wrapper.vm.ariaDescription).toEqual(expected);
            });
        });

        describe('target :: ', () => {
            it.each([
                [null, 'default'],
                ['_blank', 'external'],
                ['_blank', 'newLocation']
            ])('should return %s when `linkType` is %s', (expected, linkType) => {
                // Arrange
                const propsData = {
                    linkType
                };

                // Act
                const wrapper = shallowMount(VLink, {
                    propsData
                });

                // Assert
                expect(wrapper.vm.target).toEqual(expected);
            });
        });

        describe('rel :: ', () => {
            it.each([
                [null, 'default'],
                ['noopener', 'external'],
                [null, 'newLocation']
            ])('should return %s when `linkType` is %s', (expected, linkType) => {
                // Arrange
                const propsData = {
                    linkType
                };

                // Act
                const wrapper = shallowMount(VLink, {
                    propsData
                });

                // Assert
                expect(wrapper.vm.rel).toEqual(expected);
            });
        });
    });
});
