import { withA11y } from '@storybook/addon-a11y';
import { CollectionIcon } from '@justeat/f-vue-icons';
import SharedButtonArgTypes from './sharedButtonArgTypes';
import FButton from '../src/components/Button.vue';

export default {
    title: 'Components/Atoms/f-button',
    decorators: [withA11y],
    parameters: {
        // background spans across all stories in f-button
        backgrounds: {
            values: [
                { name: 'Grey', value: '#f5f5f5' },
                { name: 'Dark', value: '#333' }
            ],
            default: 'Grey'
        }
    }
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
            class="u-spacingBottom--large storybook-grid storybook-grid-columns--4 storybook-grid-stack--lessThanWide"
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
