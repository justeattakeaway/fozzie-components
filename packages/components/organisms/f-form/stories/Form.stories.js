import { withA11y } from '@storybook/addon-a11y';
import VForm from '../src/components/Form.vue';
import { formData } from './helpers';

export default {
    title: 'Components/Organisms',
    decorators: [withA11y]
};

export const VFormComponent = () => ({
    components: { VForm },

    data () {
        return {
            formData
        };
    },

    methods: {
        updateField ({ name, value }) {
            const formField = this.formData.formFields.find(field => field.name === name);
            formField.value = value;
        }
    },


    template: '<v-form :form-data="formData" @updated="updateField"/>'
});

VFormComponent.storyName = 'f-form';
