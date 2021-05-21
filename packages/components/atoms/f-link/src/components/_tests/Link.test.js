import { shallowMount, createLocalVue } from '@vue/test-utils';
import { VueI18n } from '@justeat/f-globalisation';
import VLink from '../Link.vue';
import tenantConfigs from '../../tenants';

const localVue = createLocalVue();
localVue.directive('aria-label', VLink.directives.ariaLabel);
localVue.use(VueI18n);

const i18n = {
    locale: 'en-GB',
    messages: {
        'en-GB': tenantConfigs['en-GB'].messages
    }
};

const linkText = 'This is a Link';
const slot = `<span>${linkText}</span>`;

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
            propsData,
            i18n,
            localVue,
            slots: {
                default: slot
            }
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
                    i18n,
                    localVue,
                    mocks: {
                        $style
                    }
                });

                // Assert
                expect(wrapper.attributes('class')).toContain('o-link--bold');
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
                    i18n,
                    localVue,
                    mocks: {
                        $style
                    }
                });

                // Assert
                expect(wrapper.attributes('class')).toContain('o-link--noDecoration');
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
                    i18n,
                    localVue,
                    mocks: {
                        $style
                    }
                });

                // Assert
                expect(wrapper.attributes('class')).toContain('o-link--full');
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
                    i18n,
                    localVue,
                    mocks: {
                        $style
                    }
                });

                // Assert
                expect(wrapper.attributes('class')).toContain('o-link--noBreak');
            });
        });
    });

    describe('computed :: ', () => {
        describe('linkText :: ', () => {
            it('should return `text` of the first slot`', () => {
                // Arrange
                const propsData = {};

                // Act
                const wrapper = shallowMount(VLink, {
                    propsData,
                    i18n,
                    localVue,
                    slots: {
                        default: slot
                    }
                });

                // Assert
                expect(wrapper.vm.linkText).toEqual(linkText);
            });
        });

        describe('newWindowMessage :: ', () => {
            const newLocationMessage = ' - Opens in a new window/screen/tab';
            const externalLinkMessage = ' - Opens an external site in a new window/screen/tab';

            it.each([
                [null, false, false],
                [newLocationMessage, false, true],
                [externalLinkMessage, true, false],
                [externalLinkMessage, true, true]
            ])('should return `%s` when `isExternal` is %s AND `opensInNewLocationTab` is $s', (expected, isExternal, opensInNewLocation) => {
                // Arrange
                const propsData = {
                    isExternal,
                    opensInNewLocation
                };

                // Act
                const wrapper = shallowMount(VLink, {
                    propsData,
                    i18n,
                    localVue
                });

                // Assert
                expect(wrapper.vm.newWindowMessage).toEqual(expected);
            });
        });

        describe('target :: ', () => {
            it.each([
                ['_blank', true],
                [null, false]
            ])('should return %s when `isExternal` is %s', (expected, isExternal) => {
                // Arrange
                const propsData = {
                    isExternal
                };

                // Act
                const wrapper = shallowMount(VLink, {
                    propsData,
                    i18n,
                    localVue
                });

                // Assert
                expect(wrapper.vm.target).toEqual(expected);
            });

            it.each([
                ['_blank', true],
                [null, false]
            ])('should return %s when `opensInNewLocation` is %s', (expected, opensInNewLocation) => {
                // Arrange
                const propsData = {
                    opensInNewLocation
                };

                // Act
                const wrapper = shallowMount(VLink, {
                    propsData,
                    i18n,
                    localVue
                });

                // Assert
                expect(wrapper.vm.target).toEqual(expected);
            });
        });

        describe('rel :: ', () => {
            it.each([
                ['noopener', true],
                [null, false]
            ])('should return %s when `isExternal` is %s', (expected, isExternal) => {
                // Arrange
                const propsData = {
                    isExternal
                };

                // Act
                const wrapper = shallowMount(VLink, {
                    propsData,
                    i18n,
                    localVue
                });

                // Assert
                expect(wrapper.vm.rel).toEqual(expected);
            });
        });
    });

    describe('ariaLabel directive', () => {
        let ariaLabel;

        beforeEach(() => {
            ariaLabel = VLink.directives.ariaLabel;
        });

        describe('the `componentUpdated` hook', () => {
            it('should set the passed elements ariaLabel attribute', () => {
                // Arrange
                const el = document.createElement('div');
                const labelText = 'my test link content';
                const suffix = ' - a suffix message';

                el.innerText = labelText;

                // Act
                ariaLabel.componentUpdated(el, { value: suffix });

                // Assert
                expect(el.ariaLabel).toEqual(labelText + suffix);
            });
        });
    });
});
