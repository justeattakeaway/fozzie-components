import { shallowMount } from '@vue/test-utils';
import { VueGlobalisationMixin } from '@justeat/f-globalisation';
import AccountInfoValidationMixin from '../AccountInfoValidationMixin.vue';
import tenantConfigs from '../../tenants';

import {
    localVue,
    i18n
} from '../../../test-utils/setup';

let baseComponent;

describe('AccountInfoValidationMixin', () => {
    describe('methods', () => {
        describe('isValidName', () => {
            it('should return true when provided just latin character set letters', async () => {
                // Arrange
                const testValue = 'Roger';
                const expectedResult = true;

                const Component = {
                    render () {},
                    mixins: [AccountInfoValidationMixin]
                };

                // Act
                const wrapper = shallowMount(Component);
                const result = wrapper.vm.isValidName(testValue);

                // Assert
                expect(result).toBe(expectedResult);
            });

            it('should return false when provided numbers', async () => {
                // Arrange
                const testValue = '12345';
                const expectedResult = false;

                const Component = {
                    render () {},
                    mixins: [AccountInfoValidationMixin]
                };

                // Act
                const wrapper = shallowMount(Component);
                const result = wrapper.vm.isValidName(testValue);

                // Assert
                expect(result).toBe(expectedResult);
            });

            it('should return false when provided a value with symbols', async () => {
                // Arrange
                const testValue = 'Roger@Black.com';
                const expectedResult = false;

                const Component = {
                    render () {},
                    mixins: [AccountInfoValidationMixin]
                };

                // Act
                const wrapper = shallowMount(Component);
                const result = wrapper.vm.isValidName(testValue);

                // Assert
                expect(result).toBe(expectedResult);
            });

            it('should return true when provided non latin character set values', async () => {
                // Arrange
                const testValue = 'Léopold';
                const expectedResult = true;

                const Component = {
                    render () {},
                    mixins: [AccountInfoValidationMixin]
                };

                // Act
                const wrapper = shallowMount(Component);
                const result = wrapper.vm.isValidName(testValue);

                // Assert
                expect(result).toBe(expectedResult);
            });

            it('should return true when provided a name with apostrophes', async () => {
                // Arrange
                const testValue = "R'oger";
                const expectedResult = true;

                const Component = {
                    render () {},
                    mixins: [AccountInfoValidationMixin]
                };

                // Act
                const wrapper = shallowMount(Component);
                const result = wrapper.vm.isValidName(testValue);

                // Assert
                expect(result).toBe(expectedResult);
            });
        });

        describe('isFormInvalid', () => {
            beforeEach(() => {
                baseComponent = {
                    render () {},
                    data () {
                        return {
                            consumer: {},
                            tenantConfigs
                        };
                    },
                    mixins: [AccountInfoValidationMixin, VueGlobalisationMixin]
                };
            });

            it('should return false when all fields have valid inputs', async () => {
                // Arrange
                baseComponent.data = () => ({
                    consumer: {
                        firstName: 'Roger',
                        lastName: 'Black',
                        phoneNumber: '1234567890',
                        line1: 'Line 1',
                        locality: 'My City',
                        postcode: 'AR511AA'
                    },
                    tenantConfigs
                });

                // Act
                const wrapper = shallowMount(baseComponent, {
                    i18n,
                    localVue,
                    propsData: { locale: 'en-GB' }
                });

                const result = wrapper.vm.isFormInvalid();

                // Assert
                expect(result).toBe(false);
            });

            it('should return true when fields are not provided values', async () => {
                // Arrange
                // Act
                const wrapper = shallowMount(baseComponent, {
                    i18n,
                    localVue,
                    propsData: { locale: 'en-GB' }
                });

                const result = wrapper.vm.isFormInvalid();

                // Assert
                expect(result).toBe(true);
            });
        });
    });
});
