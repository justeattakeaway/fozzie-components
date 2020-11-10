import { shallowMount } from '@vue/test-utils';
import CountrySelector from '../CountrySelector.vue';

describe('CountrySelector', () => {
    allure.feature('Country Selector');
    let wrapper,
        button,
        list,
        localisedName,
        siteUrl;

    beforeEach(() => {
        localisedName = 'Denmark';
        siteUrl = 'https://www.just-eat.dk';

        const propsData = {
            currentCountryName: 'United Kingdom',
            currentCountryKey: 'gb',
            countries: [
                {
                    key: 'dk',
                    localisedName,
                    siteUrl
                }
            ]
        };
        wrapper = shallowMount(CountrySelector, { propsData });
        button = wrapper.find('[data-js-test="countrySelector-button"]');
        list = wrapper.find('[data-js-test="countrySelector-list"]');
    });

    it('should be defined', () => {
        expect(wrapper.exists()).toBe(true);
    });

    it('button should exist', () => {
        expect(button.exists()).toBe(true);
    });

    it('list should not be displayed by default', () => {
        expect(list.isVisible()).toBe(false);
    });

    it('list should be displayed when button is clicked', async () => {
        await button.trigger('click'); // wait for DOM to update as a result of click being triggered

        expect(list.isVisible()).toBe(true);
    });

    it('list should not be displayed when button is clicked again', () => {
        button.trigger('click');
        button.trigger('click');
        expect(list.isVisible()).toBe(false);
    });

    it('list should contain country from props', () => {
        const country = wrapper.find('[data-js-test="countrySelector-country"]');
        expect(country.text()).toBe(localisedName);
    });

    it('should contain correct link', () => {
        const link = wrapper.find('[data-js-test="countrySelector-countryLink"]');
        expect(link.attributes('href')).toBe(siteUrl);
    });
});
