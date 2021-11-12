import { shallowMount } from '@vue/test-utils';
import FormSelectionControl from '../FormSelectionControl.vue';

describe('FormSelectionControl', () => {
    let attrs;
    let propsData;

    beforeEach(() => {
        attrs = {
            disabled: null,
            id: 'uniqueId1'
        };

        propsData = {
            inputType: 'checkbox',
            value: 'testValue'
        };
    });

    it('should be defined', () => {
        const wrapper = shallowMount(FormSelectionControl, { attrs });
        expect(wrapper.exists()).toBe(true);
    });

    describe('template ::', () => {
        describe('value ::', () => {
            it('should be set using the `value` prop', () => {
                // Arrange & Act
                const wrapper = shallowMount(FormSelectionControl, { propsData, attrs });

                // Assert
                expect(wrapper.find('input').element.value).toBe(propsData.value);
            });
        });
    });

    describe('props ::', () => {
        describe('inputType ::', () => {
            it.each([
                [false, 'text'],
                [true, 'checkbox'],
                [true, 'radio']
            ])('should return %s when value is %s', (expected, inputType) => {
                // Arrange
                const { validator } = FormSelectionControl.props.inputType;

                // Act & Assert
                expect(validator(inputType)).toBe(expected);
            });
        });
    });

    describe('computed ::', () => {
        describe('testId ::', () => {
            describe('`attributes.name` is provided ::', () => {
                it('should return an object using the attribute name', async () => {
                    // Arrange
                    propsData.attributes = {
                        name: 'testCheckbox'
                    };

                    const wrapper = shallowMount(FormSelectionControl, { propsData, attrs });

                    // Act
                    const result = await wrapper.vm.testId;

                    // Assert
                    expect(result).toMatchSnapshot();
                });
            });

            describe('`attributes.name` is not provided ::', () => {
                it('should return a generic object without using the attribute name', async () => {
                    // Arrange
                    propsData.attributes = {
                        name: null
                    };

                    const wrapper = shallowMount(FormSelectionControl, { propsData, attrs });

                    // Act
                    const result = await wrapper.vm.testId;

                    // Assert
                    expect(result).toMatchSnapshot();
                });
            });
        });
    });

    describe('methods ::', () => {
        describe('updateSelectionControl ::', () => {
            it('should emit `update` when changed', async () => {
                // Arrange
                const wrapper = shallowMount(FormSelectionControl, { propsData, attrs });

                const event = {
                    target: {
                        value: 'anotherTestValue'
                    }
                };

                // Act
                await wrapper.vm.updateSelectionControl(event);

                // Assert
                expect(wrapper.emitted('update').length).toBe(1);
            });
        });
    });
});
