import { withA11y } from '@storybook/addon-a11y';
import Toggle from '../src/components/Toggle.vue';

export default {
    title: 'Components/Atoms',
    decorators: [withA11y]
};

export const ToggleComponent = (args, { argTypes }) => ({
    components: { Toggle },

    props: Object.keys(argTypes),

    data () {
        return {
            toggleValueOne: this.checked,
            toggleValueTwo: this.checked
        };
    },

    methods: {
        updateToggleOne (value) {
            this.toggleValueOne = value;
        },

        updateToggleTwo (value) {
            this.toggleValueTwo = value;
        }
    },

    watch: {
        checked (newValue) {
            this.toggleValueOne = newValue;
            this.toggleValueTwo = newValue;
        }
    },

    template:
        `<div :dir="direction">
            <toggle
                :disabled="disabled"
                :checked="toggleValueOne"
                @update="updateToggleOne"
                :isModeRightToLeft="isModeRightToLeft"/>

            <hr>

            <fieldset style="display: flex; align-items: center; border: 0;">
                <div style="max-width: 90%; margin-right: 16px;">
                    <legend style="font-size: 20px; font-weight: 800;" id="labelID">Necessary</legend>
                    <p id="descriptionID" >These cookies allow the website to remember the choices you make to give you better functionality and personal features.</p>
                </div>
                <toggle
                    :disabled="disabled"
                    name="Necessary"
                    :checked="toggleValueTwo"
                    @update="updateToggleTwo"
                    aria-labelledby="labelID"
                    ari-describedby="descriptionID"/>
            </fields>
        </div>`
});

ToggleComponent.storyName = 'f-toggle';

ToggleComponent.args = {
    checked: false,
    disabled: false,
    direction: 'ltr'
};

ToggleComponent.argTypes = {
    checked: {
        control: { type: 'boolean' },
        description: 'If set to true, toggle will be selected.'
    },

    disabled: {
        control: { type: 'boolean' },
        description: 'If set to true, toggle will be disabled.'
    },

    direction: {
        control: { type: 'select', options: ['ltr', 'rtl'] },
        description: 'Sets writing/reading direction'
    }
};
