import { withA11y } from '@storybook/addon-a11y';
import { CollectionIcon } from '@justeat/f-vue-icons';
import {
    VALID_BUTTON_ICON_POSITION
} from '../src/constants';
import FButton from '../src/components/Button.vue';

export default {
    title: 'Components/Atoms/f-button',
    decorators: [withA11y]
};

export const ButtonComponent = (args, { argTypes }) => ({
    components: {
        FButton,
        CollectionIcon
    },
    props: Object.keys(argTypes),
    template: `
    <div>
        <div
            style="display: flex; flex-flow: row nowrap; align-items: center; justify-content: space-around; margin-bottom: 16px;"
            v-for="(list, index) in buttonLists">
            <f-button
                style="margin-right: 16px;"
                v-for="(button, index) in list"
                :key="index"
                :buttonType="button.type"
                :buttonSize="button.size"
                :disabled="disabled"
                :isFullWidth="isFullWidth"
                :actionType="actionType"
                :isIcon="false"
                :isLoading="isLoading"
                :hasIcon="hasIcon">
                <template #leading-icon>
                    <collection-icon />
                </template>
                {{ button.text }}
                <template #trailing-icon>
                    <collection-icon />
                </template>
            </f-button>
        </div>
    </div>`
});

ButtonComponent.argTypes = {
    disabled: {
        control: { type: 'boolean' },
        defaultValue: false
    },
    isFullWidth: {
        control: { type: 'boolean' },
        description: 'Button will take the whole free space of the container',
        defaultValue: false
    },
    isLoading: {
        control: { type: 'boolean' },
        description: 'Spinner instead of button text',
        defaultValue: false
    },
    actionType: {
        control: { type: 'select', options: ['button', 'submit', 'reset'] },
        description: 'Choose the type atribute for the button',
        defaultValue: 'button'
    },
    hasIcon: {
        control: { type: 'select', options: VALID_BUTTON_ICON_POSITION },
        description: 'Adds icon to the button text',
        defaultValue: false
    }
};

ButtonComponent.args = {
    buttonLists: [
        [
            { type: 'primary', size: 'large', text: 'Large Primary Button' },
            { type: 'primary', size: 'medium', text: 'Medium Primary Button' },
            { type: 'primary', size: 'small', text: 'Small Primary Button' },
            { type: 'primary', size: 'xsmall', text: 'Xsmall Primary Button' }
        ],
        [
            { type: 'secondary', size: 'large', text: 'Large Secondary Button' },
            { type: 'secondary', size: 'medium', text: 'Medium Secondary Button' },
            { type: 'secondary', size: 'small', text: 'Small Secondary Button' },
            { type: 'secondary', size: 'xsmall', text: 'Xsmall Secondary Button' }
        ],
        [
            { type: 'outline', size: 'large', text: 'Large Outline Button' },
            { type: 'outline', size: 'medium', text: 'Medium Outline Button' },
            { type: 'outline', size: 'small', text: 'Small Outline Button' },
            { type: 'outline', size: 'xsmall', text: 'Xsmall Outline Button' }
        ],
        [
            { type: 'ghost', size: 'large', text: 'Large Ghost Button' },
            { type: 'ghost', size: 'medium', text: 'Medium Ghost Button' },
            { type: 'ghost', size: 'small', text: 'Small Ghost Button' },
            { type: 'ghost', size: 'xsmall', text: 'Xsmall Ghost Button' }
        ]
    ]
};

ButtonComponent.storyName = 'Button';
