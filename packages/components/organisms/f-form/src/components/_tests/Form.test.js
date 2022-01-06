import { shallowMount } from '@vue/test-utils';
import FForm from '../Form.vue';

const formData = {
    formFields: [
        {
            name: 'firstName',
            value: 'John',
            translations: {
                label: 'First Name'
            }
        },
        {
            name: 'lastName',
            value: 'Johnson',
            translations: {
                label: 'Last Name'
            }
        },
        {
            name: 'email',
            value: 'John.Johnson@gmail.com',
            translations: {
                label: 'Email Address'
            }
        }
    ],
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

                // Assert
                expect(result).toMatchSnapshot();
            });
        });
    });

    describe('methods :: ', () => {
        describe('updateField :: ', () => {
            it('should emit `updated` event with fieldName and field value', () => {
                // Arrange
                const wrapper = shallowMount(FForm, { propsData });
                const emitSpy = jest.spyOn(wrapper.vm, '$emit');
                const payload = { fieldName: 'firstName', value: 'Joe' };

                // Act
                wrapper.vm.updateField(payload);

                // Assert
                expect(emitSpy).toHaveBeenCalledWith('updated', payload);
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
