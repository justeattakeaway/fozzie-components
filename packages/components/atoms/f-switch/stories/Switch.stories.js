import { withA11y } from '@storybook/addon-a11y';
import FSwitch from '../src/components/Switch.vue';

export default {
    title: 'Components/Atoms',
    decorators: [withA11y]
};

export const SwitchComponent = (args, { argTypes }) => ({
    components: { FSwitch },

    props: Object.keys(argTypes),

    data () {
        return {
            switchValueOne: this.checked,
            switchValueTwo: this.checked
        };
    },

    methods: {
        updatetSwitchOne (value) {
            this.switchValueOne = value;
        },

        updatetSwitchTwo (value) {
            this.switchValueTwo = value;
        }
    },

    watch: {
        checked (newValue) {
            this.switchValueOne = newValue;
            this.switchValueTwo = newValue;
        }
    },

    template:
        `<div :dir="direction">
            <f-switch
                :disabled="disabled"
                :checked="switchValueOne"
                @update="updatetSwitchOne"/>

            <hr>

            <fieldset style="display: flex; align-items: center; border: 0;">
                <div style="max-width: 90%; margin: 0 16px;">
                    <legend style="font-size: 20px; font-weight: 800;" id="labelID">Necessary</legend>
                    <p id="descriptionID" >These cookies allow the website to remember the choices you make to give you better functionality and personal features.</p>
                </div>
                <f-switch
                    :disabled="disabled"
                    name="Necessary"
                    :checked="switchValueTwo"
                    @update="updatetSwitchTwo"
                    aria-labelledby="labelID"
                    ari-describedby="descriptionID"/>
            </fieldset>
        </div>`
});

SwitchComponent.storyName = 'f-switch';

SwitchComponent.args = {
    checked: false,
    disabled: false,
    direction: 'ltr'
};

SwitchComponent.argTypes = {
    checked: {
        control: { type: 'boolean' },
        description: 'If set to true, switch will be checked (on).'
    },

    disabled: {
        control: { type: 'boolean' },
        description: 'If set to true, switch will be disabled.'
    },

    direction: {
        control: { type: 'select', options: ['ltr', 'rtl'] },
        description: 'Sets writing/reading direction'
    }
};
