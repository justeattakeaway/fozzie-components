import { shallowMount, RouterLinkStub } from '@vue/test-utils';
import VLink from '../Link.vue';

const $style = {
    'o-link--bold': 'o-link--bold',
    'o-link--noDecoration': 'o-link--noDecoration',
    'o-link--full': 'o-link--full',
    'o-link--noBreak': 'o-link--noBreak'
};

const mocks = {
    $style
};

describe('Link', () => {
    it('should be defined', () => {
        // Arrange
        const propsData = {};

        // Act
        const wrapper = shallowMount(VLink, {
            propsData
        });

        // Assert
        expect(wrapper.exists()).toBe(true);
    });

    it('should render a router link when given the `to` attribute', () => {
        // Arrange
        const propsData = {
            to: '/'
        };

        // Act
        const wrapper = shallowMount(VLink, {
            propsData,
            mocks,
            stubs: {
                RouterLink: RouterLinkStub
            }
        });

        const routerLink = wrapper.findComponent(RouterLinkStub);

        // Assert
        expect(routerLink.exists()).toBe(true);
    });

    it('should render an anchor tag when given the `href` attribute', () => {
        // Arrange
        const propsData = {
            href: '/'
        };

        // Act
        const wrapper = shallowMount(VLink, {
            propsData,
            mocks
        });

        const link = wrapper.find('[data-test-id="link-component"]');
        const routerLink = wrapper.findComponent(RouterLinkStub);

        // Assert
        expect(link.element.tagName).toBe('A');
        expect(routerLink.exists()).toBe(false);
    });

    it('should render an anchor tag when given both the `href` and `to` attributes', () => {
        // Arrange
        const propsData = {
            href: '/',
            to: '/'
        };

        // Act
        const wrapper = shallowMount(VLink, {
            propsData,
            mocks
        });

        const link = wrapper.find('[data-test-id="link-component"]');
        const routerLink = wrapper.findComponent(RouterLinkStub);

        // Assert
        expect(link.element.tagName).toBe('A');
        expect(routerLink.exists()).toBe(false);
    });

    describe('props :: ', () => {
        describe('isBold :: ', () => {
            it('should apply `o-link--bold` class to link if true', () => {
                // Arrange
                const propsData = { isBold: true };

                // Act
                const wrapper = shallowMount(VLink, {
                    propsData,
                    mocks
                });

                const link = wrapper.find('[data-test-id="link-component"]');

                // Assert
                expect(link.attributes('class')).toContain('o-link--bold');
            });
        });

        describe('hasTextDecoration :: ', () => {
            it('should apply `o-link--noDecoration` class to link if false', () => {
                // Arrange
                const propsData = { hasTextDecoration: false };

                // Act
                const wrapper = shallowMount(VLink, {
                    propsData,
                    mocks
                });

                const link = wrapper.find('[data-test-id="link-component"]');

                // Assert
                expect(link.attributes('class')).toContain('o-link--noDecoration');
            });
        });

        describe('isFullWidth :: ', () => {
            it('should apply `o-link--full` class to link if true', () => {
                // Arrange
                const propsData = { isFullWidth: true };

                // Act
                const wrapper = shallowMount(VLink, {
                    propsData,
                    mocks
                });

                const link = wrapper.find('[data-test-id="link-component"]');

                // Assert
                expect(link.attributes('class')).toContain('o-link--full');
            });
        });

        describe('noLineBreak :: ', () => {
            it('should apply `o-link--noBreak` class to link if true', () => {
                // Arrange
                const propsData = { noLineBreak: true };

                // Act
                const wrapper = shallowMount(VLink, {
                    propsData,
                    mocks
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

            describe('when `target="_blank"` is applied to the link', () => {
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

            describe('when `target="_blank"` is not applied to the link', () => {
                it.each([
                    [null, false],
                    [externalLinkMessage, true]
                ])('should return `%s` when `isExternalSite` is %s', (expected, isExternalSite) => {
                    // Arrange
                    const propsData = { isExternalSite };

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

    describe('methods :: ', () => {
        describe('bindAttrs :: ', () => {
            it.only('should set data.linkClass when link-class attribute is passed', () => {
                // Arrange
                const expected = 'my-link-class';
                const propsData = {};
                const attrs = {
                    'link-class': expected
                };

                // Act
                const wrapper = shallowMount(VLink, {
                    propsData,
                    attrs
                });

                const test = wrapper.find('[data-test-id="link-component"]');
                console.log(test);

                // Assert
                expect(wrapper.vm.linkClass).toEqual(expected);
            });

            it('should not set link-class attribute on wrapper', () => {
                // Arrange
                const expected = 'my-link-class';
                const propsData = {};
                const attrs = {
                    'link-class': expected
                };

                // Act
                const wrapper = shallowMount(VLink, {
                    propsData,
                    attrs
                });

                // Assert
                expect(wrapper.find('[data-test-id="link-component"]').attributes('link-class')).toBeUndefined();
            });

            it('should set any other custom attributes on the wrapper not link-class', () => {
                // Arrange
                const expected = 'XXX';
                const propsData = {};
                const attrs = {
                    'link-class': 'my-link-class',
                    'test-attribute': expected
                };

                // Act
                const wrapper = shallowMount(VLink, {
                    propsData,
                    attrs
                });

                // Assert
                expect(wrapper.find('[data-test-id="link-component"]').attributes('test-attribute')).toEqual(expected);
            });
        });
    });
});
