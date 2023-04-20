import { withA11y } from '@storybook/addon-a11y';
import ToggleSwitch from '../src/components/ToggleSwitch.vue';

export default {
    title: 'Components/Atoms',
    decorators: [withA11y]
};

export const ToggleSwitchComponent = (args, { argTypes }) => ({
    components: { ToggleSwitch },

    props: Object.keys(argTypes),

    data () {
        return {
            toggleSwitchValueOne: this.checked,
            toggleSwitchValueTwo: this.checked
        };
    },

    methods: {
        updateToggleSwitchOne (value) {
            this.toggleSwitchValueOne = value;
        },

        updateToggleSwitchTwo (value) {
            this.toggleSwitchValueTwo = value;
        }
    },

    watch: {
        checked (newValue) {
            this.toggleSwitchValueOne = newValue;
            this.toggleSwitchValueTwo = newValue;
        }
    },

    template:
        `<div :dir="direction">
            <toggle-switch
                :disabled="disabled"
                :checked="toggleSwitchValueOne"
                @update="updateToggleSwitchOne"/>

            <hr>

            <fieldset style="display: flex; align-items: center; border: 0;">
                <div style="max-width: 90%; margin: 0 16px;">
                    <legend style="font-size: 20px; font-weight: 800;" id="labelID">Necessary</legend>
                    <p id="descriptionID" >These cookies allow the website to remember the choices you make to give you better functionality and personal features.</p>
                </div>
                <toggle-switch
                    :disabled="disabled"
                    name="Necessary"
                    :checked="toggleSwitchValueTwo"
                    @update="updateToggleSwitchTwo"
                    aria-labelledby="labelID"
                    ari-describedby="descriptionID"/>
            </fieldset>
        </div>`
});

ToggleSwitchComponent.storyName = 'f-toggle-switch';

ToggleSwitchComponent.args = {
    checked: false,
    disabled: false,
    direction: 'ltr'
};

ToggleSwitchComponent.argTypes = {
    checked: {
        control: { type: 'boolean' },
        description: 'If set to true, toggle-switch will be checked (on).'
    },

    disabled: {
        control: { type: 'boolean' },
        description: 'If set to true, toggle-switch will be disabled.'
    },

    direction: {
        control: { type: 'select', options: ['ltr', 'rtl'] },
        description: 'Sets writing/reading direction'
    }
};
