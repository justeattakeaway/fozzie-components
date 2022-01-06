import { withA11y } from '@storybook/addon-a11y';
import VForm from '../src/components/Form.vue';

export default {
    title: 'Components/Organisms',
    decorators: [withA11y]
};

export const VFormComponent = () => ({
    components: { VForm },
    data () {
        return {
            formData: {
                formFields: [
                    {
                        name: 'firstName',
                        value: '',
                        translations: {
                            label: 'First Name',
                            validationMessages: {
                                required: 'Enter First Name'
                            }
                        }
                    },
                    {
                        name: 'lastName',
                        value: '',
                        translations: {
                            label: 'Last Name'
                        }
                    },
                    {
                        name: 'mobileNumber',
                        value: '',
                        translations: {
                            label: 'Mobile Number',
                            validationMessages: {
                                required: 'Enter Mobile Number',
                                invalid: 'Enter valid Mobile Number'
                            }
                        }
                    },
                    {
                        name: 'email',
                        value: '',
                        translations: {
                            label: 'Email Address',
                            validationMessages: {
                                required: 'Enter Email Address',
                                invalid: 'Enter valid Email Address'
                            }
                        }
                    }
                ],
                buttonText: 'Continue'
            }
        };
    },

    methods: {
        updateField ({ fieldName, value }) {
            const formField = this.formData.formFields.find(field => field.name === fieldName);
            formField.value = value;
        }
    },


    template: '<v-form :form-data="formData" @updated="updateField"/>'
});

VFormComponent.storyName = 'f-form';
