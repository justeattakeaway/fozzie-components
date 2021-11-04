import { createLocalVue, shallowMount } from '@vue/test-utils';
import VueI18n from 'vue-i18n';
import i18nMocker from './helper';
import HowItWorksLayout from '../HowItWorks.vue';

import enGB from '../../tenants/en-GB';
import enAU from '../../tenants/en-AU';

const localVue = createLocalVue();
localVue.use(VueI18n);

let messages,
    wrapper;

beforeEach(() => {
    jest.resetAllMocks();

    messages = {
        'en-GB': enGB,
        'en-AU': enAU
    };
});

describe('HowItWorksLayout', () => {
    it('should be defined', () => {
        // Arrange
        const i18n = {
            locale: 'en-AU',
            fallbackLocale: 'en-AU',
            messages
        };

        // Act
        wrapper = shallowMount(HowItWorksLayout, {
            localVue,
            i18n,
            mocks: {
                $t: key => i18nMocker(key, i18n.locale)
            }
        });

        // Assert
        expect(wrapper).toBeDefined();
    });

    describe('when in AU', () => {
        beforeEach(() => {
            // Arrange
            const i18n = {
                locale: 'en-AU',
                fallbackLocale: 'en-AU',
                messages
            };

            // Act
            wrapper = shallowMount(HowItWorksLayout, {
                localVue,
                i18n,
                mocks: {
                    $t: key => i18nMocker(key, i18n.locale)
                }
            });
        });

        it('bags should be calculated as expected', () => {
            // Assert
            expect(wrapper.vm.bags).toEqual([
                {
                    number: '1st',
                    image: 'https://d30v2pzvrfyzpo.cloudfront.net/b/hw/img/decoration/40-small-object-bag-dollar.svg',
                    value: '$6'
                },
                {
                    number: '2nd',
                    image: 'https://d30v2pzvrfyzpo.cloudfront.net/b/hw/img/decoration/50-small-object-bag-dollar.svg',
                    value: '$7.50'
                },
                {
                    number: '3rd',
                    image: 'https://d30v2pzvrfyzpo.cloudfront.net/b/hw/img/decoration/45-small-object-bag-dollar.svg',
                    value: '$6.75'
                },
                {
                    number: '4th',
                    image: 'https://d30v2pzvrfyzpo.cloudfront.net/b/hw/img/decoration/40-small-object-bag-dollar.svg',
                    value: '$6'
                },
                {
                    number: '5th',
                    image: 'https://d30v2pzvrfyzpo.cloudfront.net/b/hw/img/decoration/55-small-object-bag-dollar.svg',
                    value: '$8.25'
                }
            ]);
        });

        it('total should be calculated as expected', () => {
            // Assert
            expect(wrapper.vm.total).toEqual('$34.50');
        });
    });

    describe('when in UK', () => {
        beforeEach(() => {
            // Arrange
            const i18n = {
                locale: 'en-GB',
                fallbackLocale: 'en-GB',
                messages
            };

            // Act
            wrapper = shallowMount(HowItWorksLayout, {
                localVue,
                i18n,
                mocks: {
                    $t: key => i18nMocker(key, i18n.locale)
                }
            });
        });

        it('bags should be calculated as expected', () => {
            // Assert
            expect(wrapper.vm.bags).toEqual([
                {
                    number: '1st',
                    image: 'https://d30v2pzvrfyzpo.cloudfront.net/b/hw/img/decoration/40-small-object-bag-pound.svg',
                    value: '£4'
                },
                {
                    number: '2nd',
                    image: 'https://d30v2pzvrfyzpo.cloudfront.net/b/hw/img/decoration/50-small-object-bag-pound.svg',
                    value: '£5'
                },
                {
                    number: '3rd',
                    image: 'https://d30v2pzvrfyzpo.cloudfront.net/b/hw/img/decoration/45-small-object-bag-pound.svg',
                    value: '£4.50'
                },
                {
                    number: '4th',
                    image: 'https://d30v2pzvrfyzpo.cloudfront.net/b/hw/img/decoration/40-small-object-bag-pound.svg',
                    value: '£4'
                },
                {
                    number: '5th',
                    image: 'https://d30v2pzvrfyzpo.cloudfront.net/b/hw/img/decoration/55-small-object-bag-pound.svg',
                    value: '£5.50'
                }
            ]);
        });

        it('total should be calculated as expected', () => {
            // Assert
            expect(wrapper.vm.total).toEqual('£23.00');
        });
    });
});
