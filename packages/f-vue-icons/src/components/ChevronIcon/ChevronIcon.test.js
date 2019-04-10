import { shallowMount } from '@vue/test-utils';
import ChevronIcon from './ChevronIcon.vue';

describe('ChevronIcon', () => {
    it('should be defined', () => {
        const wrapper = shallowMount(ChevronIcon);
        expect(wrapper).toBeDefined();
    });

    it('should add component class by default', () => {
        // Arrange
        const wrapper = shallowMount(ChevronIcon);

        // Act
        const result = wrapper.classes();

        // Assert
        expect(result).toEqual(['c-icon', 'c-icon--chevron']);
    });

    it('should render default component markup', () => {
        // Arrange & Act
        const wrapper = shallowMount(ChevronIcon);

        // Assert
        expect(wrapper).toMatchSnapshot();
    });

    it('should add small class', () => {
        // Arrange
        const propsData = { isSmall: true };
        const wrapper = shallowMount(ChevronIcon, {
            propsData
        });

        // Act
        const result = wrapper.classes();

        // Assert
        expect(result).toContain('c-icon--chevron--small');
    });

    it('should add up class', () => {
        // Arrange
        const propsData = { isFacingUp: true };
        const wrapper = shallowMount(ChevronIcon, {
            propsData
        });

        // Act
        const result = wrapper.classes();

        // Assert
        expect(result).toContain('c-icon--chevron--up');
    });

    it('should add left class', () => {
        // Arrange
        const propsData = { isFacingLeft: true };
        const wrapper = shallowMount(ChevronIcon, {
            propsData
        });

        // Act
        const result = wrapper.classes();

        // Assert
        expect(result).toContain('c-icon--chevron--left');
    });

    it('should add right class', () => {
        // Arrange
        const propsData = { isFacingRight: true };
        const wrapper = shallowMount(ChevronIcon, {
            propsData
        });

        // Act
        const result = wrapper.classes();

        // Assert
        expect(result).toContain('c-icon--chevron--right');
    });

    it('should be able to add multiple classes', () => {
        // Arrange
        const propsData = {
            isSmall: true,
            isFacingUp: true
        };
        const wrapper = shallowMount(ChevronIcon, {
            propsData
        });

        // Act
        const result = wrapper.classes();

        // Assert
        expect(result).toEqual(['c-icon', 'c-icon--chevron', 'c-icon--chevron--small', 'c-icon--chevron--up']);
    });
});
