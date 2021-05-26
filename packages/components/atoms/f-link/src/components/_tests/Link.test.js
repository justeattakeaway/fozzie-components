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
            const externalLinkMessage = 'Opens an external site';
            const externalNewLocationLinkMessage = 'Opens an external site in a new window/screen/tab';

            describe('When `target="_blank"` is applied to the link', () => {
                it.each([
                    [newLocationMessage, false],
                    [externalNewLocationLinkMessage, true]
                ])('should return `%s` when `isExternalSite` is %s', (expected, isExternalSite) => {
                    // Arrange
                    const propsData = {
                        isExternalSite,
                        target: '_blank'
                    };

                    // Act
                    const wrapper = shallowMount(VLink, {
                        propsData
                    });

                    // Assert
                    expect(wrapper.vm.ariaDescription).toEqual(expected);
                });
            });

            describe('When `target="_blank"` is not applied to the link', () => {
                it.each([
                    [null, false],
                    [externalLinkMessage, true]
                ])('should return `%s` when `isExternalSite` is %s', (expected, isExternalSite) => {
                    // Arrange
                    const propsData = {
                        isExternalSite
                    };

                    // Act
                    const wrapper = shallowMount(VLink, {
                        propsData
                    });

                    // Assert
                    expect(wrapper.vm.ariaDescription).toEqual(expected);
                });
            });
        });
    });
});
