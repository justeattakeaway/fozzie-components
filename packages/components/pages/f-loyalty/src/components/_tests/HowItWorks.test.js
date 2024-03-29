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
        const locale = 'en-AU';
        const i18n = {
            locale,
            fallbackLocale: 'en-AU',
            messages
        };

        // Act
        wrapper = shallowMount(HowItWorksLayout, {
            localVue,
            i18n,
            propsData: {
                locale
            },
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
            const locale = 'en-AU';
            const i18n = {
                locale,
                fallbackLocale: 'en-AU',
                messages
            };

            // Act
            wrapper = shallowMount(HowItWorksLayout, {
                localVue,
                i18n,
                propsData: {
                    locale
                },
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
                    image: 'https://just-eat-prod-sg-res.cloudinary.com/image/upload/v1630068495/Experiments/Homeweb-Coreweb/bag-dollar-40.svg',
                    value: '$6'
                },
                {
                    number: '2nd',
                    image: 'https://just-eat-prod-sg-res.cloudinary.com/image/upload/v1630068495/Experiments/Homeweb-Coreweb/bag-dollar-50.svg',
                    value: '$7.50'
                },
                {
                    number: '3rd',
                    image: 'https://just-eat-prod-sg-res.cloudinary.com/image/upload/v1630068495/Experiments/Homeweb-Coreweb/bag-dollar-45.svg',
                    value: '$6.75'
                },
                {
                    number: '4th',
                    image: 'https://just-eat-prod-sg-res.cloudinary.com/image/upload/v1630068495/Experiments/Homeweb-Coreweb/bag-dollar-40.svg',
                    value: '$6'
                },
                {
                    number: '5th',
                    image: 'https://just-eat-prod-sg-res.cloudinary.com/image/upload/v1630068495/Experiments/Homeweb-Coreweb/bag-dollar-55.svg',
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
            const locale = 'en-GB';
            const i18n = {
                locale,
                fallbackLocale: 'en-GB',
                messages
            };


            // Act
            wrapper = shallowMount(HowItWorksLayout, {
                localVue,
                i18n,
                propsData: {
                    locale
                },
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
                    image: 'https://just-eat-prod-eu-res.cloudinary.com/image/upload/v1630068495/Experiments/Homeweb-Coreweb/bag-pound-40.svg',
                    value: '£4'
                },
                {
                    number: '2nd',
                    image: 'https://just-eat-prod-eu-res.cloudinary.com/image/upload/v1630068495/Experiments/Homeweb-Coreweb/bag-pound-50.svg',
                    value: '£5'
                },
                {
                    number: '3rd',
                    image: 'https://just-eat-prod-eu-res.cloudinary.com/image/upload/v1630068495/Experiments/Homeweb-Coreweb/bag-pound-45.svg',
                    value: '£4.50'
                },
                {
                    number: '4th',
                    image: 'https://just-eat-prod-eu-res.cloudinary.com/image/upload/v1630068495/Experiments/Homeweb-Coreweb/bag-pound-40.svg',
                    value: '£4'
                },
                {
                    number: '5th',
                    image: 'https://just-eat-prod-eu-res.cloudinary.com/image/upload/v1630068495/Experiments/Homeweb-Coreweb/bag-pound-55.svg',
                    value: '£5.50'
                }
            ]);
        });

        it('total should be calculated as expected', () => {
            // Assert
            expect(wrapper.vm.total).toEqual('£23.00');
        });
    });

    describe('when in NZ', () => {
        beforeEach(() => {
            // Arrange
            const locale = 'en-NZ';
            const i18n = {
                locale,
                fallbackLocale: 'en-NZ',
                messages
            };

            // Act
            wrapper = shallowMount(HowItWorksLayout, {
                localVue,
                i18n,
                propsData: {
                    locale
                },
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
                    image: 'https://just-eat-prod-sg-res.cloudinary.com/image/upload/v1630068495/Experiments/Homeweb-Coreweb/bag-dollar-40.svg',
                    value: '$4'
                },
                {
                    number: '2nd',
                    image: 'https://just-eat-prod-sg-res.cloudinary.com/image/upload/v1630068495/Experiments/Homeweb-Coreweb/bag-dollar-50.svg',
                    value: '$5'
                },
                {
                    number: '3rd',
                    image: 'https://just-eat-prod-sg-res.cloudinary.com/image/upload/v1630068495/Experiments/Homeweb-Coreweb/bag-dollar-45.svg',
                    value: '$4.50'
                },
                {
                    number: '4th',
                    image: 'https://just-eat-prod-sg-res.cloudinary.com/image/upload/v1630068495/Experiments/Homeweb-Coreweb/bag-dollar-40.svg',
                    value: '$4'
                },
                {
                    number: '5th',
                    image: 'https://just-eat-prod-sg-res.cloudinary.com/image/upload/v1630068495/Experiments/Homeweb-Coreweb/bag-dollar-55.svg',
                    value: '$5.50'
                }
            ]);
        });

        it('total should be calculated as expected', () => {
            // Assert
            expect(wrapper.vm.total).toEqual('$23.00');
        });
    });

    describe('when in IE', () => {
        beforeEach(() => {
            // Arrange
            const locale = 'en-IE';
            const i18n = {
                locale,
                fallbackLocale: 'en-IE',
                messages
            };

            // Act
            wrapper = shallowMount(HowItWorksLayout, {
                localVue,
                i18n,
                propsData: {
                    locale
                },
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
                    image: 'https://just-eat-prod-eu-res.cloudinary.com/image/upload/v1630068495/Experiments/Homeweb-Coreweb/bag-euro-25.svg',
                    value: '€2.50'
                },
                {
                    number: '2nd',
                    image: 'https://just-eat-prod-eu-res.cloudinary.com/image/upload/v1630068495/Experiments/Homeweb-Coreweb/bag-euro-30.svg',
                    value: '€3'
                },
                {
                    number: '3rd',
                    image: 'https://just-eat-prod-eu-res.cloudinary.com/image/upload/v1630068495/Experiments/Homeweb-Coreweb/bag-euro-35.svg',
                    value: '€3.50'
                },
                {
                    number: '4th',
                    image: 'https://just-eat-prod-eu-res.cloudinary.com/image/upload/v1630068495/Experiments/Homeweb-Coreweb/bag-euro-25.svg',
                    value: '€2.50'
                },
                {
                    number: '5th',
                    image: 'https://just-eat-prod-eu-res.cloudinary.com/image/upload/v1630068495/Experiments/Homeweb-Coreweb/bag-euro-30.svg',
                    value: '€3'
                }
            ]);
        });

        it('total should be calculated as expected', () => {
            // Assert
            expect(wrapper.vm.total).toEqual('€14.50');
        });
    });
});
