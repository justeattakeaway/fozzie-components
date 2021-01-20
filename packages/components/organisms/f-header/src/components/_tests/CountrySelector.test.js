import { shallowMount } from '@vue/test-utils';
import CountrySelector from '../CountrySelector.vue';

let wrapper;

const defaultPropsData = {
    isBelowMid: false,
    currentCountryKey: 'gb',
    changeCountryText: 'You are on the UK website, click here to change.',
    selectYourCountryText: 'Select your country',
    openNav: jest.fn()
};

const defaultData = {
    countries: [
        {
            key: 'au',
            localisedName: 'Australia',
            siteUrl: 'https://www.menulog.com.au',
            gtm: 'click_country_au'
        },
        {
            key: 'at',
            localisedName: 'Österreich',
            siteUrl: 'https://www.lieferando.at',
            gtm: 'click_country_at'
        }
    ],
    countrySelectorIsOpen: false
};

describe('CountrySelector ::', () => {
    allure.feature('Country Selector');

    beforeEach(() => {
        // Arrange
        wrapper = shallowMount(CountrySelector, {
            propsData: defaultPropsData,
            data () {
                return {
                    defaultData
                };
            }
        });
    });

    it('should be defined', () => {
        // Assert
        expect(wrapper.exists()).toBe(true);
    });

    it('should be shown if `countrySelectorIsOpen: true`', async () => {
        // Act
        await wrapper.vm.openCountrySelector();

        // Assert
        expect(wrapper.find('[data-test-id="countrySelector-toggle"]').classes()).toContain('open');
    });

    it('should not be shown when `countrySelectorIsOpen: false`', async () => {
        // Act
        await wrapper.vm.closeCountrySelector();

        // Assert
        expect(wrapper.find('[data-test-id="countrySelector-toggle"]').classes()).not.toContain('open');
    });
});
