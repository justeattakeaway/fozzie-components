import { withA11y } from '@storybook/addon-a11y';
import { WalkingIcon } from '@justeattakeaway/pie-icons-vue';
import SharedButtonArgTypes from './sharedButtonArgTypes';
import FButton from '../src/components/Button.vue';

export default {
    title: 'Components/Atoms/f-button',
    decorators: [withA11y]
};

export const ButtonComponent = (args, { argTypes }) => ({
    components: {
        FButton,
        WalkingIcon
    },
    props: Object.keys(argTypes),
    template: `
    <div>
        <div
            class="u-spacingBottom--large storybook-grid storybook-grid-columns--5 storybook-grid-stack--lessThanWide"
            v-for="(list, index) in buttonLists">
            <f-button
                class="u-spacingBottom--large"
                v-for="(button, index) in list"
                :key="index"
                :buttonType="button.type"
                :buttonSize="button.size"
                :disabled="disabled"
                :isFullWidth="isFullWidth"
                :actionType="actionType"
                :isIcon="false"
                :isLoading="isLoading"
                :hasIcon="hasIcon"
                :href="href">
                <template #leading-icon>
                    <walking-icon />
                </template>
                {{ button.text }}
                <template #trailing-icon>
                    <walking-icon />
                </template>
            </f-button>
        </div>
    </div>`
});

ButtonComponent.argTypes = {
    ...SharedButtonArgTypes,
    actionType: {
        control: { type: 'select', options: ['button', 'submit', 'reset'] },
        description: 'Choose the action type of the button',
        defaultValue: 'button'
    }
};

ButtonComponent.args = {
    buttonLists: [
        [
            { type: 'primary', size: 'large', text: 'Large Primary' },
            { type: 'primary', size: 'medium', text: 'Medium Primary' },
            { type: 'primary', size: 'small-expressive', text: 'Small-Expressive Primary' },
            { type: 'primary', size: 'small-productive', text: 'Small-Productive Primary' },
            { type: 'primary', size: 'xsmall', text: 'Xsmall Primary' }
        ],
        [
            { type: 'secondary', size: 'large', text: 'Large Secondary' },
            { type: 'secondary', size: 'medium', text: 'Medium Secondary' },
            { type: 'secondary', size: 'small-expressive', text: 'Small-Expressive Secondary' },
            { type: 'secondary', size: 'small-productive', text: 'Small-Productive Secondary' },
            { type: 'secondary', size: 'xsmall', text: 'Xsmall Secondary' }
        ],
        [
            { type: 'outline', size: 'large', text: 'Large Outline' },
            { type: 'outline', size: 'medium', text: 'Medium Outline' },
            { type: 'outline', size: 'small-expressive', text: 'Small-Expressive Outline' },
            { type: 'outline', size: 'small-productive', text: 'Small-Productive Outline' },
            { type: 'outline', size: 'xsmall', text: 'Xsmall Outline' }
        ],
        [
            { type: 'ghost', size: 'large', text: 'Large Ghost' },
            { type: 'ghost', size: 'medium', text: 'Medium Ghost' },
            { type: 'ghost', size: 'small-expressive', text: 'Small-Expressive Ghost' },
            { type: 'ghost', size: 'small-productive', text: 'Small-Productive Ghost' },
            { type: 'ghost', size: 'xsmall', text: 'Xsmall Ghost' }
        ]
    ]
};

ButtonComponent.storyName = 'Button';
