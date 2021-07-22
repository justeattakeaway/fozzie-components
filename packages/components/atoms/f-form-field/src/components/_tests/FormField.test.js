import { shallowMount, mount } from '@vue/test-utils';
import FormField from '../FormField.vue';
import FormDropdown from '../FormDropdown.vue';
import {
    DEFAULT_INPUT_TYPE, VALID_ICON_INPUT_TYPES, VALID_INPUT_TYPES, VALID_LABEL_STYLES, VALID_TRAILING_ICON_INPUT_TYPES
} from '../../constants';

const $style = {
    'c-formField-field--noFocus': 'c-formField-field--noFocus',
    'c-formField-field--small': 'c-formField-field--small',
    'c-formField-field--medium': 'c-formField-field--medium',
    'c-formField-field--large': 'c-formField-field--large'
};

const slot = '<div>ICON</div>';

describe('FormField', () => {
    it('should be defined', () => {
        const propsData = {};
        const wrapper = shallowMount(FormField, { propsData });
        expect(wrapper.exists()).toBe(true);
    });

    describe('props ::', () => {
        describe('inputType ::', () => {
            it('should be set to type `text` by default if no value is set', () => {
                // Arrange
                const propsData = {};

                // Act
                const wrapper = shallowMount(FormField, { propsData });
                const formInput = wrapper.find('input'); // change to .c-formField when CSS Modules is working

                // Assert
                expect(formInput.attributes('type')).toBe(DEFAULT_INPUT_TYPE);
            });

            it('should set the type of the input element if the prop value passed in is valid', () => {
                // Arrange
                const propsData = {
                    inputType: 'email'
                };

                // Act
                const wrapper = shallowMount(FormField, { propsData });
                const formInput = wrapper.find('input'); // change to .c-formField when CSS Modules is working

                // Assert
                expect(formInput.attributes('type')).toBe(propsData.inputType);
            });

            it('should fallback to type `text` if inputType is invalid', () => {
                // Arrange
                const propsData = {
                    inputType: 'invalidType'
                };
                console.error = jest.fn();

                // Act
                const wrapper = shallowMount(FormField, { propsData });
                const formInput = wrapper.find('input'); // change to .c-formField when CSS Modules is working

                // Assert
                expect(console.error).toHaveBeenCalledTimes(1); // checks that vue is throwing an error because of the defined prop validation function
                expect(formInput.attributes('type')).toBe(DEFAULT_INPUT_TYPE);
            });

            it.each(VALID_INPUT_TYPES)('should set the type of form input element as expected if inputType=%p is specified', definedType => {
                // Arrange
                const propsData = {
                    inputType: definedType
                };

                // Act
                const wrapper = shallowMount(FormField, { propsData });
                const formInput = wrapper.find('input'); // change to .c-formField when CSS Modules is working

                // Assert
                expect(formInput.attributes('type')).toBe(definedType);
            });

            it('should include the `min` and `max` attributes if provided for inputType=`number`', () => {
                // Arrange
                const propsData = {
                    inputType: 'number',
                    minNumber: -10,
                    maxNumber: 10
                };

                // Act
                const wrapper = shallowMount(FormField, { propsData });
                const formInput = wrapper.find('input');

                // Assert
                expect(formInput.attributes('min')).toBe('-10');
                expect(formInput.attributes('max')).toBe('10');
            });

            it('should not include the `min` and `max` attributes if not provided for inputType=`number`', () => {
                // Arrange
                const propsData = {
                    inputType: 'number'
                };

                // Act
                const wrapper = shallowMount(FormField, { propsData });
                const formInput = wrapper.find('input');

                // Assert
                expect(formInput.attributes('min')).toBeUndefined();
                expect(formInput.attributes('max')).toBeUndefined();
            });

            it('should not include the `min` and `max` attributes for default inputType if not provided', () => {
                // Arrange & Act
                const wrapper = shallowMount(FormField);
                const formInput = wrapper.find('input');

                // Assert
                expect(formInput.attributes('min')).toBeUndefined();
                expect(formInput.attributes('max')).toBeUndefined();
            });

            it('should not include the `min` and `max` attributes for default inputType even if provided', () => {
                // Arrange
                const propsData = {
                    minNumber: -10,
                    maxNumber: 10
                };

                // Act
                const wrapper = shallowMount(FormField, { propsData });
                const formInput = wrapper.find('input');

                // Assert
                expect(formInput.attributes('min')).toBeUndefined();
                expect(formInput.attributes('max')).toBeUndefined();
            });

            it('should display the dropdown component if inputType=`dropdown`', () => {
                // Arrange
                const propsData = {
                    inputType: 'dropdown'
                };

                // Act
                const wrapper = shallowMount(FormField, { propsData });

                // Assert
                expect(wrapper.contains(FormDropdown)).toBe(true);
            });

            describe.each([
                ['textarea', true],
                ['text', false]
            ])('is %s', (inputType, expected) => {
                // Arrange
                const propsData = {
                    inputType
                };
                const wrapper = shallowMount(FormField, { propsData });

                // Act
                const textareaElement = wrapper.find('[data-test-id="formfield-textarea"]');

                // Assert
                it(`should ${inputType === 'textarea' ? '' : 'not '}display a textarea element`, () => {
                    expect(textareaElement.exists()).toBe(expected);
                });
            });
        });

        describe('labelStyle ::', () => {
            it.each(VALID_LABEL_STYLES)('should set the type of form label element as expected if labelStyle=%p is specified', definedType => {
                // Arrange
                const propsData = {
                    labelStyle: definedType
                };

                // Act
                const wrapper = shallowMount(FormField, { propsData });
                const formLabel = wrapper.find('form-label-stub');

                // Assert
                expect(formLabel.attributes('labelstyle')).toBe(definedType);
            });

            describe('when set to `inlineNarrow`', () => {
                const MOBILE = 767;
                const DESKTOP = 768;
                const eventName = 'resize';
                let resizeWindow;

                beforeEach(() => {
                    resizeWindow = width => {
                        window.innerWidth = width;
                        window.dispatchEvent(new Event(eventName));
                    };
                });

                it('should append the label above input when window size is not mobile', async () => {
                    // Arrange
                    const propsData = {
                        labelStyle: 'inlineNarrow',
                        labelText: 'Test Label'
                    };

                    resizeWindow(DESKTOP);

                    // Act
                    const wrapper = await shallowMount(FormField, { propsData });

                    const defaultLabel = wrapper.find('[data-test-id="formfield-label"]');
                    const inlineLabel = wrapper.find('[data-test-id="formfield-label--inline"]');

                    // Assert
                    expect(defaultLabel.exists()).toBe(true);
                    expect(inlineLabel.exists()).toBe(false);
                });

                it('should append the label inline with input when window size is mobile', async () => {
                    // Arrange
                    const propsData = {
                        labelStyle: 'inlineNarrow',
                        labelText: 'Test Label'
                    };

                    resizeWindow(MOBILE);

                    // Act
                    const wrapper = await shallowMount(FormField, { propsData });

                    const defaultLabel = wrapper.find('[data-test-id="formfield-label"]');
                    const inlineLabel = wrapper.find('[data-test-id="formfield-label--inline"]');

                    // Assert
                    expect(defaultLabel.exists()).toBe(false);
                    expect(inlineLabel.exists()).toBe(true);
                });
            });
        });

        describe('fieldSize ::', () => {
            it.each([
                ['c-formField-field--small', 'small'],
                ['c-formField-field--medium', 'medium'],
                ['c-formField-field--large', 'large']
            ])('should apply %s class to input when set to %s', (className, fieldSize) => {
                // Arrange
                const propsData = {
                    fieldSize
                };

                // Act
                const wrapper = shallowMount(FormField, {
                    propsData,
                    mocks: {
                        $style
                    }
                });

                const formInput = wrapper.find('input');

                // Assert
                expect(formInput.attributes('class')).toContain(className);
            });
        });
    });

    describe('computed :: ', () => {
        describe('isSelectionControl :: ', () => {
            it('should capitalise to first letter of `buttonSize` prop :: ', () => {
                // Arrange & Act
                const wrapper = shallowMount(FormField, {
                    propsData: {
                        inputType: 'checkbox'
                    },
                    mocks: {
                        $style
                    }
                });
                const formInput = wrapper.find('input'); // change to .c-formField when CSS Modules is working

                // Assert
                expect(formInput.attributes('class')).toContain('c-formField-field--noFocus');
            });
        });

        describe('isDisabled :: ', () => {
            it.each([
                [true, 'disabled'],
                [false, null]
            ])('should return %s if disabled attribute is %s', (expected, disabled) => {
                // Arrange
                const propsData = {
                    disabled
                };

                // Act
                const wrapper = shallowMount(FormField, { propsData });

                // Assert
                expect(wrapper.vm.isDisabled).toEqual(expected);
            });
        });

        describe('isValidIconField :: ', () => {
            it.each([
                [true, 'email'],
                [true, 'password'],
                [true, 'dropdown'],
                [true, 'number'],
                [true, 'tel'],
                [false, 'radio'],
                [false, 'checkbox'],
                [false, null]
            ])('should return %s if `inputType` is %s', (expected, inputType) => {
                // Arrange
                const propsData = {
                    inputType
                };

                // Act
                const wrapper = shallowMount(FormField, { propsData });

                // Assert
                expect(wrapper.vm.isValidIconField).toEqual(expected);
            });
        });

        describe('hasLeadingIcon :: ', () => {
            // Arrange
            const propsData = {
                inputType: 'text'
            };

            it('should return `true` when slots contain `icon-leading`', () => {
                // Act
                const wrapper = shallowMount(FormField, {
                    propsData,
                    slots: {
                        'icon-leading': slot
                    }
                });

                // Assert
                expect(wrapper.vm.hasLeadingIcon).toEqual(true);
            });

            it('should return `false` when slots do not contain `icon-leading`', () => {
                // Act
                const wrapper = shallowMount(FormField, {
                    propsData,
                    slots: null
                });

                // Assert
                expect(wrapper.vm.hasLeadingIcon).toEqual(false);
            });
        });

        describe('hasTrailingIcon :: ', () => {
            // Arrange
            const propsData = {
                inputType: 'text'
            };

            it('should return `true` when slots contain `icon-trailing`', () => {
                // Act
                const wrapper = shallowMount(FormField, {
                    propsData,
                    slots: {
                        'icon-trailing': slot
                    }
                });

                // Assert
                expect(wrapper.vm.hasTrailingIcon).toEqual(true);
            });

            it('should return `false` when slots do not contain `icon-trailing`', () => {
                // Act
                const wrapper = shallowMount(FormField, {
                    propsData,
                    slots: null
                });

                // Assert
                expect(wrapper.vm.hasTrailingIcon).toEqual(false);
            });
        });
    });

    describe('attrs ::', () => {
        describe('name ::', () => {
            it('should set testId.container to `formfield-container when name is is not set`', () => {
                // Arrange
                const attrsData = {};

                // Act
                const wrapper = shallowMount(FormField, { attrsData });

                // Assert
                expect(wrapper.attributes('data-test-id')).toBe('formfield-container');
            });

            it('should include attribute `name` in the generated container data-test-id when it is set', () => {
                // Arrange
                const attrsData = {
                    attrs: {
                        name: 'email'
                    }
                };

                // Act
                const wrapper = shallowMount(FormField, attrsData);

                // Assert
                expect(wrapper.attributes('data-test-id')).toBe(`formfield-${attrsData.attrs.name}`);
            });

            it('should include attribute `name` and an `input` suffix` in the generated input data-test-id when it is set', () => {
                // Arrange
                const attrsData = {
                    attrs: {
                        name: 'email'
                    }
                };

                // Act
                const wrapper = shallowMount(FormField, attrsData);
                const formInput = wrapper.find('input');

                // Assert
                expect(formInput.attributes('data-test-id')).toBe(`formfield-${attrsData.attrs.name}-input`);
            });

            it('should include attribute `name` and a `textarea` suffix in the generated textarea data-test-id when it is set', () => {
                // Arrange
                const attrs = {
                    name: 'email'
                };

                const propsData = {
                    inputType: 'textarea'
                };

                // Act
                const wrapper = mount(FormField, { attrs, propsData });
                const formInput = wrapper.find('textarea');

                // Assert
                expect(formInput.attributes('data-test-id')).toBe(`formfield-${attrs.name}-textarea`);
            });

            it('when name is set, it should be included in the generated testId.input data-test-id', () => {
                // Arrange
                const attrsData = {
                    attrs: {
                        name: 'email'
                    }
                };

                // Act
                const wrapper = mount(FormField, attrsData);
                const formLabel = wrapper.find('label');

                // Assert
                expect(formLabel.attributes('data-test-id')).toBe(`formfield-${attrsData.attrs.name}-label`);
            });
        });
    });

    describe('events ::', () => {
        describe('@input ::', () => {
            it.each(VALID_INPUT_TYPES)('should only trigger one event emission for inputType `%s`', inputType => {
                // Arrange
                const propsData = { inputType };
                const wrapper = shallowMount(FormField, { propsData });

                const formInput = wrapper.find('input');

                // Act
                formInput.trigger('input');

                // Assert
                expect(wrapper.emitted().input).toHaveLength(1);
            });
        });

        describe('@change ::', () => {
            it('should only trigger one event emission', () => {
                // Arrange
                const propsData = {
                    inputType: 'dropdown',
                    dropdownOptions: []
                };
                const wrapper = mount(FormField, { propsData });

                const formDropdown = wrapper.find('select');

                // Act
                formDropdown.trigger('change');

                // Assert
                expect(wrapper.emitted().input).toHaveLength(1);
            });
        });
    });

    describe('methods ::', () => {
        describe('validateProps ::', () => {
            let spy;

            beforeEach(() => {
                spy = jest.spyOn(global.console, 'error').mockImplementation(() => { });
            });

            afterEach(() => {
                spy.mockRestore();
            });

            describe('when `hasLeadingIcon` is true', () => {
                it.each(VALID_ICON_INPUT_TYPES)('should not throw an error when `inputType` is set to %s', inputType => {
                    // Arrange
                    const propsData = { inputType };

                    // Act & Assert
                    expect(() => {
                        shallowMount(FormField, {
                            propsData,
                            slots: {
                                'icon-leading': slot
                            }
                        });
                    }).not.toThrowError();
                });

                it.each(['textarea', 'checkbox', 'radio'])('should throw an error when `inputType` is set to %s', inputType => {
                    // Arrange
                    const propsData = { inputType };

                    // Act & Assert
                    expect(() => {
                        shallowMount(FormField, {
                            propsData,
                            slots: {
                                'icon-leading': slot
                            }
                        });
                    }).toThrowError(`Form field is set to have inputType="${inputType}", but icons can only be displayed one of the following inputTypes: "${VALID_ICON_INPUT_TYPES.join('", "')}"`);
                });
            });

            describe('when `hasTrailingIcon` is true', () => {
                it.each([
                    'text',
                    'email',
                    'password',
                    'number',
                    'tel'
                ])('should not throw an error when `inputType` is set to %s', inputType => {
                    // Arrange
                    const propsData = { inputType };

                    // Act & Assert
                    expect(() => {
                        shallowMount(FormField, {
                            propsData,
                            slots: {
                                'icon-trailing': slot
                            }
                        });
                    }).not.toThrowError();
                });

                it.each(['textarea', 'checkbox', 'radio'])('should throw an error when `inputType` is set to %s', inputType => {
                    // Arrange
                    const propsData = { inputType };

                    // Act & Assert
                    expect(() => {
                        shallowMount(FormField, {
                            propsData,
                            slots: {
                                'icon-trailing': slot
                            }
                        });
                    }).toThrowError(`Form field is set to have inputType="${inputType}", but icons can only be displayed one of the following inputTypes: "${VALID_ICON_INPUT_TYPES.join('", "')}"`);
                });

                it('should throw an error when `inputType` is set to `dropdown`', () => {
                    // Arrange
                    const propsData = { inputType: 'dropdown' };

                    // Act & Assert
                    expect(() => {
                        shallowMount(FormField, {
                            propsData,
                            slots: {
                                'icon-trailing': slot
                            }
                        });
                    }).toThrowError(`Form field is set to have inputType="dropdown", but trailing icons can only be displayed one of the following inputTypes: "${VALID_TRAILING_ICON_INPUT_TYPES.join('", "')}"`);
                });
            });
        });
    });
});
