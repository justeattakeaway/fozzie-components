import { withA11y } from '@storybook/addon-a11y';
import Toggle from '../src/components/Toggle.vue';

export default {
    title: 'Components/Atoms/f-toggle',
    decorators: [withA11y]
};

export const ToggleComponent = (args, { argTypes }) => ({
    components: { Toggle },
    props: Object.keys(argTypes),

    template:
        `<div>
            <toggle
                :disabled="disabled"
                :value="value"
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
                    :checked="value"
                    :isModeRightToLeft="isModeRightToLeft"
                    :ariaLabelledBy="ariaLabelledBy"
                    :ariaDescribedBy="ariaDescribedBy"/>
            </div>
        </div>`
});

ToggleComponent.storyName = 'f-toggle';

ToggleComponent.args = {
    value: true,
    disabled: false,
    isModeRightToLeft: false,
    ariaLabelledBy: 'labelID',
    ariaDescribedBy: 'descriptionID'
};

ToggleComponent.argTypes = {
    value: {
        control: { type: 'boolean' },
        description: 'If set to true, toggle will be selected'
    },

    disabled: {
        control: { type: 'boolean' },
        description: 'If set to true, toggle will be disabled'
    },

    isModeRightToLeft: {
        control: { type: 'boolean' },
        description: 'If set to true, toggle will be disabled'
    }
};
