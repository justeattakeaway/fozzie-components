import { shallowMount } from '@vue/test-utils';
import AppStoreIcon from './AppStoreIcon.vue';

let propsData = { name: 'ios' };

describe('AppStoreIcon', () => {
    it('should be defined', () => {
        const wrapper = shallowMount(AppStoreIcon, {
            propsData
        });
        expect(wrapper).toBeDefined();
    });

    it('default component markup is rendered', () => {
        // Arrange & Act
        const wrapper = shallowMount(AppStoreIcon, {
            propsData
        });

        // Assert
        expect(wrapper).toMatchSnapshot();
    });

    it('Ios component for GB should be rendered if ios name is passed as a prop and locale is default', () => {
        // Arrange
        const wrapper = shallowMount(AppStoreIcon, {
            propsData
        });

        // Act
        const result = wrapper.vm.iconComponent;

        // Assert
        expect(result).toBe('ios-icon-en-gb');
    });

    it('Ios component for DK should be rendered if ios name is passed as a prop and da-DK locale is passed as a prop', () => {
        // Arrange
        propsData = { name: 'ios', locale: 'da-DK' };
        const wrapper = shallowMount(AppStoreIcon, {
            propsData
        });

        // Act
        const result = wrapper.vm.iconComponent;

        // Assert
        expect(result).toBe('ios-icon-da-dk');
    });
});
