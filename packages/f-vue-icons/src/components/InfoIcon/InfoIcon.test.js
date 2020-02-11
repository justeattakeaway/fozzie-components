import { shallowMount } from '@vue/test-utils';
import InfoIcon from './InfoIcon.vue';

describe('InfoIcon', () => {
    it('should be defined', () => {
        const wrapper = shallowMount(InfoIcon);
        expect(wrapper.exists()).toBe(true);
    });

    it('component class is added by default', () => {
        // Arrange
        const wrapper = shallowMount(InfoIcon);

        // Act
        const result = wrapper.classes();

        // Assert
        expect(result).toEqual(['c-icon', 'c-icon--info']);
    });

    it('default component markup is rendered', () => {
        // Arrange & Act
        const wrapper = shallowMount(InfoIcon);

        // Assert
        expect(wrapper).toMatchSnapshot();
    });

    it('white class is added', () => {
        // Arrange
        const propsData = { isWhite: true };
        const wrapper = shallowMount(InfoIcon, {
            propsData
        });

        // Act
        const result = wrapper.classes();

        // Assert
        expect(result).toContain('c-icon--white');
    });

    it('blue class is added', () => {
        // Arrange
        const propsData = { isBlue: true };
        const wrapper = shallowMount(InfoIcon, {
            propsData
        });

        // Act
        const result = wrapper.classes();

        // Assert
        expect(result).toContain('c-icon--blue');
    });

    it('green class is added', () => {
        // Arrange
        const propsData = { isGreen: true };
        const wrapper = shallowMount(InfoIcon, {
            propsData
        });

        // Act
        const result = wrapper.classes();

        // Assert
        expect(result).toContain('c-icon--green');
    });

    it('orange class is added', () => {
        // Arrange
        const propsData = { isOrange: true };
        const wrapper = shallowMount(InfoIcon, {
            propsData
        });

        // Act
        const result = wrapper.classes();

        // Assert
        expect(result).toContain('c-icon--orange');
    });

    it('grey--darkest class is added', () => {
        // Arrange
        const propsData = { isDarkestGrey: true };
        const wrapper = shallowMount(InfoIcon, {
            propsData
        });

        // Act
        const result = wrapper.classes();

        // Assert
        expect(result).toContain('c-icon--grey--darkest');
    });

    it('pushLeft class is added', () => {
        // Arrange
        const propsData = { pushLeft: true };
        const wrapper = shallowMount(InfoIcon, {
            propsData
        });

        // Act
        const result = wrapper.classes();

        // Assert
        expect(result).toContain('c-icon--pushLeft');
    });

    it('multiple classes can be added', () => {
        // Arrange
        const propsData = {
            isBlue: true,
            pushLeft: true
        };
        const wrapper = shallowMount(InfoIcon, {
            propsData
        });

        // Act
        const result = wrapper.classes();

        // Assert
        expect(result).toEqual(['c-icon', 'c-icon--info', 'c-icon--blue', 'c-icon--pushLeft']);
    });
});
