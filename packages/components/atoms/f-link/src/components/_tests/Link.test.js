import { shallowMount, createLocalVue } from '@vue/test-utils';
import { VueI18n } from '@justeat/f-globalisation';
import VLink from '../Link.vue';
import tenantConfigs from '../../tenants';

const localVue = createLocalVue();
localVue.use(VueI18n);

const i18n = {
    locale: 'en-GB',
    messages: {
        'en-GB': tenantConfigs['en-GB'].messages
    }
};

const linkText = 'This is a Link';
const slot = `<span>${linkText}</span>`;

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

        describe('ariaLabel :: ', () => {
            const newLocationMessage = `${linkText} - Opens in a new window/screen/tab`;
            const externalLinkMessage = `${linkText} - Opens an external site in a new window/screen/tab`;

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
                    localVue,
                    slots: {
                        default: slot
                    }
                });

                // Assert
                expect(wrapper.vm.ariaLabel).toEqual(expected);
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
                    localVue,
                    slots: {
                        default: slot
                    }
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
                    localVue,
                    slots: {
                        default: slot
                    }
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
                    localVue,
                    slots: {
                        default: slot
                    }
                });

                // Assert
                expect(wrapper.vm.rel).toEqual(expected);
            });
        });
    });
});
