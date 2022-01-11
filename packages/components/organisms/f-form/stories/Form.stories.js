// Uncomment the import below to add prop controls to your Story (and add `withKnobs` to the decorators array)
// import {
//     withKnobs, select, boolean
// } from '@storybook/addon-knobs';
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
                            label: 'First Name'
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
                        name: 'email',
                        value: '',
                        translations: {
                            label: 'Email Address'
                        }
                    }
                ],
                buttonText: 'Continue'
            }
        };
    },
    template: '<v-form :form-data="formData"/>'
});

VFormComponent.storyName = 'f-form';
