import { shallowMount } from '@vue/test-utils';
import FButton from '../Button.vue';

describe('Button', () => {
    allure.feature('Button');
    it('should be defined', () => {
        const propsData = {};
        const wrapper = shallowMount(FButton, { propsData });
        expect(wrapper.exists()).toBe(true);
    });

    describe('computed :: ', () => {
        describe('buttonSizeClassname :: ', () => {
            it('should capitalise to first letter of `buttonSize` prop :: ', () => {
                // Arrange
                const propsData = {buttonSize: 'medium'};

                // Act
                const wrapper = shallowMount(FButton, { propsData });

                // Assert
                expect(wrapper.vm.buttonSizeClassname).toEqual('Medium');
            });

            it('should capitalise to first two letters of `buttonSize` prop if `xsmall` :: ', () => {
                // Arrange
                const propsData = {buttonSize: 'xsmall'};

                // Act
                const wrapper = shallowMount(FButton, { propsData });

                // Assert
                expect(wrapper.vm.buttonSizeClassname).toEqual('XSmall');
            });
        });

        describe('componentType :: ', () => {
            describe('when `href` prop is an empty string :: :: ', () => {
                const propsData = {href: ''};

                it('should return `action`', () => {
                    // Act
                    const wrapper = shallowMount(FButton, { propsData });

                    // Assert
                    expect(wrapper.vm.componentType).toEqual('action');
                });

                it('should render `Action` component', () => {
                    // Act
                    const wrapper = shallowMount(FButton, { propsData });

                    // Assert
                    expect(wrapper.find('action-stub').exists()).toBeTruthy();
                });
            });

            describe('when `href` prop is not an empty string :: :: ', () => {
                const propsData = {href: 'http://www.google.com'};

                it('should return `navigation`', () => {
                    // Act
                    const wrapper = shallowMount(FButton, { propsData });

                    // Assert
                    expect(wrapper.vm.componentType).toEqual('navigation');
                });

                it('should render `Navigation` component', () => {
                    // Act
                    const wrapper = shallowMount(FButton, { propsData });

                    // Assert
                    expect(wrapper.find('navigation-stub').exists()).toBeTruthy();
                });
            });
        });
    });
});
