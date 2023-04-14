import { withA11y } from '@storybook/addon-a11y';
import Toggle from '../src/components/Toggle.vue';

export default {
    title: 'Components/Atoms/f-toggle',
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
        `<div>
            <toggle
                :disabled="disabled"
                :checked="toggleValueOne"
                @update="updateToggleOne"
                :isModeRightToLeft="isModeRightToLeft"/>

            <hr>

            <div style="display: flex; align-items: center;">
                <div style="max-width: 90%; margin-right: 16px;">
                    <h4 style="margin-bottom: 8px;" id="labelID">Necessary</h4>
                    <p id="descriptionID" >These cookies allow the website to remember the choices you make to give you better functionality and personal features.</p>
                </div>
                <toggle
                    :disabled="disabled"
                    name="Necessary"
                    :checked="toggleValueTwo"
                    @update="updateToggleTwo"
                    ariaLabelledBy="labelID"
                    ariaDescribedBy="descriptionID"/>
            </div>
        </div>`
});

ToggleComponent.storyName = 'f-toggle';

ToggleComponent.args = {
    checked: true,
    disabled: false,
    isModeRightToLeft: false
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

    isModeRightToLeft: {
        control: { type: 'boolean' },
        description: 'If set to true, toggle direction will change for right to left reading.'
    }
};
