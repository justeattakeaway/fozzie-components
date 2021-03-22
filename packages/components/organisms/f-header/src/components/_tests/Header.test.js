import { shallowMount } from '@vue/test-utils';
import Header from '../Header.vue';

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
        const wrapper = shallowMount(Header, { propsData });

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

    it('should render ml themed component if NZ local passed', () => {
        // Arrange
        const propsData = {
            locale: 'en-NZ',
            headerBackgroundTheme: 'transparent'
        };

        // Act
        const wrapper = shallowMount(Header, { propsData });

        // Assert
        expect(wrapper.attributes('data-theme')).toBe('ml');
    });

    it('should render je themed component if NO local passed', () => {
        // Arrange
        const propsData = {
            locale: 'nb-NO',
            headerBackgroundTheme: 'transparent'
        };

        // Act
        const wrapper = shallowMount(Header, { propsData });

        // Assert
        expect(wrapper.attributes('data-theme')).toBe('je');
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
