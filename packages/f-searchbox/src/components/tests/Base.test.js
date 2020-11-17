import { shallowMount } from '@vue/test-utils';
import { globalisationServices } from '@justeat/f-services';
import Base from '../Base.vue';
import tenantConfigs from '../../tenants';

describe('`Base`', () => {
    it('should be defined', () => {
        // Arrange
        const propsData = {};
        const wrapper = shallowMount(Base, { propsData });

        // Act & Assert
        expect(wrapper.exists()).toBe(true);
    });

    describe('`shell` configs', () => {
        it('should set the correct `shell` element to `search-shell` when `isShellHidden` is not set', () => {
            // Arrange
            const propsData = {};

            // Act
            const wrapper = shallowMount(Base, { propsData });

            // Assert
            expect(wrapper.vm.element).toBe('search-shell');
        });

        it('should set the correct `shell` element to `search-shell` when `isShellHidden` is set to `true`', () => {
            // Arrange
            const propsData = {
                config: { isShellHidden: false }
            };

            // Act
            const wrapper = shallowMount(Base, { propsData });

            // Assert
            expect(wrapper.vm.element).toBe('search-shell');
        });

        it('should set the correct `shell` element to `no-search-shell` when `isShellHidden` is set to `true` ', () => {
            // Arrange
            const propsData = {
                config: { isShellHidden: true }
            };

            // Act
            const wrapper = shallowMount(Base, { propsData });

            // Assert
            expect(wrapper.vm.element).toBe('no-search-shell');
        });
    });

    describe('Base `reactive` data elements', () => {
        describe('`copy`', () => {
            it('should return the copy relative to the tenant', () => {
                // Arrange
                const locale = globalisationServices.getLocale(tenantConfigs, '', 'en-GB');
                const localeConfig = tenantConfigs[locale];
                const propsData = {};

                // Act
                const wrapper = shallowMount(Base, {
                    propsData
                });

                // Assert
                expect(wrapper.vm.copy).toEqual(localeConfig.copy);
            });
        });
    });
});
