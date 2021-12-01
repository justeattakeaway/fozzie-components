import { shallowMount } from '@vue/test-utils';

import CountrySelector from '../CountrySelector.vue';

const $style = {
    'is-open': 'is-open'
};

const defaultPropsData = {
    tabindex: 0
};

let wrapper;

describe('Country Selector', () => {
    it('should have "is-open" class when isCountrySelectorOpen is true', async () => {
        // Arrange
        wrapper = shallowMount(CountrySelector, {
            propsData: defaultPropsData,
            mocks: { $style }
        });

        // Act
        await wrapper.setData({ isCountrySelectorOpen: true });

        // Assert
        expect(wrapper.classes()).toContain('is-open');
    });

    it('should not have "is-open" class when isCountrySelectorOpen is false', async () => {
        // Arrange
        wrapper = shallowMount(CountrySelector, {
            propsData: defaultPropsData,
            mocks: { $style }
        });

        // Act
        await wrapper.setData({ isCountrySelectorOpen: false });

        // Assert
        expect(wrapper.classes()).not.toContain('is-open');
    });

    it('should set "aria-hidden" attribute to false when open', async () => {
        // Arrange
        wrapper = shallowMount(CountrySelector, {
            propsData: defaultPropsData
        });

        // Act
        await wrapper.setData({ isCountrySelectorOpen: true });

        // Assert
        expect(wrapper.find('[data-test-id="countrySelector-popover"]').attributes('aria-hidden')).toBeFalsy();
    });

    it('should set "aria-hidden" attribute to true when closed', async () => {
        // Arrange
        wrapper = shallowMount(CountrySelector, {
            propsData: defaultPropsData
        });

        // Act
        await wrapper.setData({ isCountrySelectorOpen: false });

        // Assert
        expect(wrapper.find('[data-test-id="countrySelector-popover"]').attributes('aria-hidden')).toBeTruthy();
    });

    describe(':: methods ::', () => {
        describe('openCountrySelector', () => {
            it('should emit "open-country-selector" event', async () => {
                // Arrange
                wrapper = shallowMount(CountrySelector, {
                    propsData: defaultPropsData,
                    mocks: { $style }
                });
                await wrapper.setData({ isCountrySelectorOpen: false });

                // Act
                wrapper.vm.openCountrySelector();

                // Assert
                expect(wrapper.emitted('open-country-selector')).toHaveLength(1);
            });

            it('should set isCountrySelectorOpen to true', async () => {
                // Arrange
                wrapper = shallowMount(CountrySelector, {
                    propsData: defaultPropsData,
                    mocks: { $style }
                });
                await wrapper.setData({ isCountrySelectorOpen: false });

                // Act
                wrapper.vm.openCountrySelector();

                // Assert
                expect(wrapper.vm.isCountrySelectorOpen).toBe(true);
            });
        });

        describe('closeCountrySelector', () => {
            it('should emit "close-country-selector" event', async () => {
                // Arrange
                wrapper = shallowMount(CountrySelector, {
                    propsData: defaultPropsData,
                    mocks: { $style }
                });
                await wrapper.setData({ isCountrySelectorOpen: true });

                // Act
                wrapper.vm.closeCountrySelector();

                // Assert
                expect(wrapper.emitted('close-country-selector')).toHaveLength(1);
            });

            it('should set isCountrySelectorOpen to false', async () => {
                // Arrange
                wrapper = shallowMount(CountrySelector, {
                    propsData: defaultPropsData,
                    mocks: { $style }
                });
                await wrapper.setData({ isCountrySelectorOpen: true });

                // Act
                wrapper.vm.closeCountrySelector();

                // Assert
                expect(wrapper.vm.isCountrySelectorOpen).toBe(false);
            });
        });

        describe('toggleCountrySelector', () => {
            it.each([
                [true, false],
                [false, true]
            ])('should change isCountrySelectorOpen from %s to %s', async (before, after) => {
                // Arrange
                wrapper = shallowMount(CountrySelector, {
                    propsData: defaultPropsData,
                    mocks: { $style }
                });
                await wrapper.setData({ isCountrySelectorOpen: before });

                // Act
                wrapper.vm.toggleCountrySelector();

                // Assert
                expect(wrapper.vm.isCountrySelectorOpen).toBe(after);
            });

            it('should emit "toggle-country-selector" event', async () => {
                // Arrange
                wrapper = shallowMount(CountrySelector, {
                    propsData: defaultPropsData,
                    mocks: { $style }
                });

                // Act
                wrapper.vm.toggleCountrySelector();

                // Assert
                expect(wrapper.emitted('toggle-country-selector')).toHaveLength(1);
            });
        });
    });
});
