import { shallowMount } from '@vue/test-utils';
import Header from '../Header.vue';

const $style = {
    'c-header': 'c-header',
    'c-header-container': 'c-header-container',
    'c-header--transparent': 'c-header--transparent',
    'c-header--gradient': 'c-header--gradient',
    'c-header--whiteSeamless': 'c-header--whiteSeamless'
};

describe('Header', () => {
    it('should be defined', () => {
        const propsData = {
            headerBackgroundTheme: 'transparent'
        };
        const wrapper = shallowMount(Header, { propsData });
        expect(wrapper.exists()).toBe(true);
    });

    it('should render default component markup', () => {
        // Arrange
        const propsData = {
            headerBackgroundTheme: 'transparent'
        };

        // Act
        const wrapper = shallowMount(Header, {
            propsData,
            mocks: {
                $style
            }
        });

        // Assert
        expect(wrapper).toMatchSnapshot();
    });


    it('should render ml themed component if AU local passed', () => {
        // Arrange
        const propsData = {
            locale: 'en-AU',
            headerBackgroundTheme: 'transparent'
        };

        // Act
        const wrapper = shallowMount(Header, { propsData });

        // Assert
        expect(wrapper.attributes('data-theme')).toBe('ml');
    });


    it('should render jet themed component if shouldUseJetLogo prop is true even when there is no locale', () => {
        // Arrange
        const propsData = {
            locale: '',
            headerBackgroundTheme: 'transparent',
            shouldUseJetLogo: true
        };

        // Act
        const wrapper = shallowMount(Header, { propsData });

        // Assert
        expect(wrapper.attributes('data-theme')).toBe('jet');
    });
});

describe('showDeliveryEnquiryWithContext', () => {
    it.each([
        [undefined, true, undefined],
        [false, false, { text: 'Deliver with us', link: 'link' }],
        [true, true, { text: 'Deliver with us', link: 'link' }]
    ])(
        'should be "%s" if `showDeliveryEnquiry` prop is "%s" and `deliveryEnquiry` prop is "%s"',
        (expected, showDeliveryEnquiryValue, deliveryEnquiryValue) => {
        // Arrange & Act
            const wrapper = shallowMount(Header, {
                propsData: { showDeliveryEnquiry: showDeliveryEnquiryValue },
                data () {
                    return {
                        copy: {
                            deliveryEnquiry: deliveryEnquiryValue
                        }
                    };
                }
            });

            // Assert
            expect(wrapper.vm.showDeliveryEnquiryWithContent).toBe(expected);
        }
    );
});

describe('showOffersLinkWithContent', () => {
    it.each([
        [undefined, true, undefined],
        [false, false, { text: 'For you', link: 'link' }],
        [true, true, { text: 'For you', link: 'link' }]
    ])(
        'should be "%s" if `showDeliveryEnquiry` prop is "%s" and `offers` prop is "%s"',
        (expected, showOffersLinkValue, offersValue) => {
        // Arrange & Act
            const wrapper = shallowMount(Header, {
                propsData: { showOffersLink: showOffersLinkValue },
                data () {
                    return {
                        copy: {
                            offers: offersValue
                        }
                    };
                }
            });

            // Assert
            expect(wrapper.vm.showOffersLinkWithContent).toBe(expected);
        }
    );
});
