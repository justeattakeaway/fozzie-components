import { shallowMount } from '@vue/test-utils';
import FForm from '../Form.vue';

const formData = {
    formFields: {
        firstName: {
            name: 'firstName',
            value: '',
            translations: {
                label: 'First Name'
            }
        },
        lastName: {
            name: 'lastName',
            value: '',
            translations: {
                label: 'Last Name'
            }
        },
        email: {
            name: 'email',
            value: '',
            translations: {
                label: 'Email Address'
            }
        }
    },
    buttonText: 'Continue'
};

describe('Form', () => {
    let propsData;

    beforeEach(() => {
        propsData = { formData };
    });

    it('should be defined', () => {
        // Arrange & Act
        const wrapper = shallowMount(FForm, { propsData });

        // Assert
        expect(wrapper.exists()).toBe(true);
    });

    describe('computed :: ', () => {
        describe('formFields :: ', () => {
            it('should return an object of `formData` keys and field values', () => {
                // Arrange & Act
                const wrapper = shallowMount(FForm, { propsData });

                const result = wrapper.vm.formFields;
                const passedData = propsData.formData.formFields;

                // Assert
                expect(result.firstName).toEqual(passedData.firstName.value);
                expect(result.lastName).toEqual(passedData.lastName.value);
                expect(result.email).toEqual(passedData.email.value);
            });
        });
    });

    describe('methods :: ', () => {
        describe('updateField :: ', () => {
            it('should emit `updated` event with fieldName and field value', () => {
                // Arrange
                const wrapper = shallowMount(FForm, { propsData });
                const payload = { fieldName: 'firstName', value: 'Joe' };

                // Act
                wrapper.vm.updateField(payload);

                // Assert
                expect(wrapper.emitted('updated').length).toBe(1);
                expect(wrapper.emitted('updated')[0][0]).toEqual(payload);
            });
        });

        describe('onFormSubmit :: ', () => {
            it('should emit `form-submitting`', () => {
                // Arrange
                const wrapper = shallowMount(FForm, { propsData });

                // Act
                wrapper.vm.onFormSubmit();

                // Assert
                expect(wrapper.emitted('form-submitting').length).toBe(1);
            });
        });
    });
});
