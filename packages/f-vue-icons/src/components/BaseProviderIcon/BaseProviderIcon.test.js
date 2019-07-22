import { shallowMount } from '@vue/test-utils';
import BaseProviderIcon from './BaseProviderIcon.vue';

let propsData = { name: 'facebook' };

describe('BaseProviderIcon', () => {
    it('should be defined', () => {
        const wrapper = shallowMount(BaseProviderIcon, {
            propsData
        });
        expect(wrapper).toBeDefined();
    });

    it('default component markup is rendered', () => {
        // Arrange & Act
        const wrapper = shallowMount(BaseProviderIcon, {
            propsData
        });

        // Assert
        expect(wrapper).toMatchSnapshot();
    });

    it('Maestro card component should be rendered if "maestro" name is passed as a prop', () => {
        // Arrange
        propsData = { name: 'maestro' };
        const wrapper = shallowMount(BaseProviderIcon, {
            propsData
        });


        // Act
        const result = wrapper.vm.iconType;

        // Assert
        expect(result).toBe('maestro-icon');
    });
});
