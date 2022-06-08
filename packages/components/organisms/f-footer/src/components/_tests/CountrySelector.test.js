import { shallowMount } from '@vue/test-utils';
import CountrySelector from '../CountrySelector.vue';

describe('CountrySelector', () => {
    let wrapper,
        button,
        lang,
        list,
        localisedName,
        siteUrl;

    beforeEach(() => {
        localisedName = 'Ireland';
        siteUrl = 'https://www.just-eat.ie';
        lang = 'en-IE';

        const propsData = {
            currentCountryName: 'United Kingdom',
            currentCountryKey: 'gb',
            countries: [
                {
                    key: 'en',
                    lang,
                    localisedName,
                    siteUrl
                }
            ]
        };
        wrapper = shallowMount(CountrySelector, { propsData });
        button = wrapper.find('[data-test-id="countrySelector-button"]');
        list = wrapper.find('[data-test-id="countrySelector-list"]');
    });

    it('should be defined', () => {
        // Assert
        expect(wrapper.exists()).toBe(true);
    });

    it('button should exist', () => {
        // Assert
        expect(button.exists()).toBe(true);
    });

    it('list should not be displayed by default', () => {
        // Assert
        expect(list.isVisible()).toBe(false);
    });

    it('list should be displayed when button is clicked', async () => {
        // Act
        await button.trigger('click'); // wait for DOM to update as a result of click being triggered

        // Assert
        expect(list.isVisible()).toBe(true);
    });

    it('list should not be displayed when button is clicked again', () => {
        // Act
        button.trigger('click');
        button.trigger('click');

        // Assert
        expect(list.isVisible()).toBe(false);
    });

    it('list should contain country from props', () => {
        // Arrange & Act
        const country = wrapper.find(`[data-test-id="countrySelector-country-${wrapper.key}"]`);

        // Assert
        expect(country.text()).toBe(localisedName);
    });

    it('should contain correct link', () => {
        // Arrange & Act
        const link = wrapper.find('[data-test-id="countrySelector-countryLink"]');

        // Assert
        expect(link.attributes('href')).toBe(siteUrl);
    });

    it('should contain `lang` attribute', () => {
        // Arrange & Act
        const text = wrapper.find('[data-test-id="countrySelector-countryLink"]').find('p');

        // Assert
        expect(text.attributes('lang')).toBe(lang);
    });
});
