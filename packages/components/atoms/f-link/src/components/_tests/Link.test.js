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
const url = 'https://www.just-eat.com';

describe('Link', () => {
    it('should be defined', () => {
        const propsData = {
            linkText: 'This is a Link',
            url: 'https://www.just-eat.com'
        };
        const wrapper = shallowMount(VLink, {
            propsData,
            i18n,
            localVue
        });
        expect(wrapper.exists()).toBe(true);
    });

    describe('computed :: ', () => {
        describe('ariaLabel :: ', () => {
            const fullMessage = `${linkText} - Opens an external site in a new location`;
            const newLocationMessage = `${linkText} - Opens in a new location`;
            const externalLinkMessage = `${linkText} - Opens an external site`;

            it.each([
                [linkText, false, false],
                [fullMessage, true, true],
                [newLocationMessage, false, true],
                [externalLinkMessage, true, false]
            ])('should return `%s` when `isExternalLink` is %s AND `opensInNewTab` is $s', (expected, isExternalLink, opensInNew) => {
                const propsData = {
                    linkText: 'This is a Link',
                    url: 'https://www.just-eat.com',
                    isExternalLink,
                    opensInNew
                };

                const wrapper = shallowMount(VLink, {
                    propsData,
                    i18n,
                    localVue
                });

                expect(wrapper.vm.ariaLabel).toEqual(expected);
            });
        });

        describe('target :: ', () => {
            it.each([
                ['_blank', true],
                [null, false]
            ])('should return %s when `isExternalLink` is %s', (expected, isExternalLink) => {
                const propsData = {
                    linkText,
                    url,
                    isExternalLink
                };

                const wrapper = shallowMount(VLink, {
                    propsData,
                    i18n,
                    localVue
                });

                expect(wrapper.vm.target).toEqual(expected);
            });
        });

        describe('rel :: ', () => {
            it.each([
                ['noopener', true],
                [null, false]
            ])('should return %s when `opensInNew` is %s', (expected, opensInNew) => {
                const propsData = {
                    linkText,
                    url,
                    opensInNew
                };

                const wrapper = shallowMount(VLink, {
                    propsData,
                    i18n,
                    localVue
                });

                expect(wrapper.vm.rel).toEqual(expected);
            });
        });
    });
});
