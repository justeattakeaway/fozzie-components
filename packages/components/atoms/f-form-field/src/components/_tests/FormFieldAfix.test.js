import { shallowMount } from '@vue/test-utils';
import FormFieldAffixed from '../FormFieldAffixed.vue';

describe('FormFieldAffixed', () => {
    const attributes = {
        disabled: null
    };

    const propsData = { attributes };

    it('should be defined', () => {
        const wrapper = shallowMount(FormFieldAffixed, { propsData });
        expect(wrapper.exists()).toBe(true);
    });

    describe('props ::', () => {
        describe('prefix ::', () => {
            describe.each([
                [null, false],
                ['', false],
                ['$', true]
            ])('when prefix value is', (prefixValue, prefixVisible) => {
                it(`should ${prefixVisible ? '' : 'not '}display 'c-formField-affixed-prefix'`, () => {
                    // Arrange & Act
                    propsData.prefix = prefixValue;

                    const wrapper = shallowMount(FormFieldAffixed, { propsData });
                    const formPrefix = wrapper.find('[data-test-id="formfield-affixed-prefix"]');

                    // Assert
                    expect(formPrefix.exists()).toBe(prefixVisible);
                });
            });
        });

        describe('suffix ::', () => {
            describe.each([
                [null, false],
                ['', false],
                ['GBP', true]
            ])('when suffix value is', (suffixValue, suffixVisible) => {
                it(`should ${suffixVisible ? '' : 'not '}display 'c-formField-affixed-suffix'`, () => {
                    // Arrange & Act
                    propsData.suffix = suffixValue;

                    const wrapper = shallowMount(FormFieldAffixed, { propsData });
                    const formSuffix = wrapper.find('[data-test-id="formfield-affixed-suffix"]');

                    // Assert
                    expect(formSuffix.exists()).toBe(suffixVisible);
                });
            });
        });
    });

    describe('computed ::', () => {
        describe('testId :: ', () => {
            describe('when `attributes` has name value', () => {
                it('should return testIds for form field', () => {
                    // Arrange
                    propsData.attributes = {
                        name: 'formfield-4'
                    };

                    // Act
                    const wrapper = shallowMount(FormFieldAffixed, { propsData });

                    // Assert
                    expect(wrapper.vm.testId).toMatchSnapshot();
                });
            });

            describe('when `attributes` does not have name value', () => {
                it('should return default testIds', () => {
                    // Arrange
                    propsData.attributes = {
                        name: null
                    };

                    // Act
                    const wrapper = shallowMount(FormFieldAffixed, { propsData });

                    // Assert
                    expect(wrapper.vm.testId).toMatchSnapshot();
                });
            });
        });
    });

    describe('methods ::', () => {
        describe('updateInput ::', () => {
            it('should emit `update` when an option is selected', async () => {
                // Arrange
                const wrapper = shallowMount(FormFieldAffixed, { propsData });

                const event = {
                    target: {
                        value: 'test option'
                    }
                };

                // Act
                await wrapper.vm.updateInput(event);

                // Assert
                expect(wrapper.emitted('update').length).toBe(1);
            });
        });
    });
});
