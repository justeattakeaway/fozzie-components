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
        const propsData = {
            href: '/'
        };

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
                    href: '/',
                    isBold: true
                };

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
                const propsData = {
                    hasTextDecoration: false,
                    href: '/'
                };

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
                const propsData = {
                    href: '/',
                    isFullWidth: true
                };

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
                const propsData = {
                    href: '/',
                    noLineBreak: true
                };

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

        describe('isRouterLink ::', () => {
            it('should render a router link when true', () => {
                // Arrange
                const propsData = {
                    href: '/',
                    isRouterLink: true
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

            it('should render an anchor tag when false', () => {
                // Arrange
                const propsData = {
                    href: '/',
                    isRouterLink: false
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
                        href: '/',
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
                    const propsData = {
                        href: '/',
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
