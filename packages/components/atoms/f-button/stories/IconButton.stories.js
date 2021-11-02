import { withA11y } from '@storybook/addon-a11y';
import {
    CrossIcon, PlusIcon, MoreVerticalIcon
} from '@justeat/f-vue-icons';
import SharedButtonArgTypes from './sharedButtonArgTypes';
import FButton from '../src/components/Button.vue';

export default {
    title: 'Components/Atoms/f-button',
    decorators: [withA11y],
    parameters: {
        backgrounds: {
            values: [
                { name: 'White', value: '#fff' },
                { name: 'Dark', value: '#333' },
                { name: 'Blue', value: '#bfe6ff' }
            ],
            default: 'White'
        }
    }
};

export const IconButtonComponent = (args, { argTypes }) => ({
    components: {
        FButton,
        CrossIcon,
        PlusIcon,
        MoreVerticalIcon
    },
    props: Object.keys(argTypes),
    template: `
    <div>
        <div class="u-spacingBottom--large storybook-grid storybook-grid-columns--4 storybook-grid-stack--lessThanWide"
        v-for="(list, index) in iconButtonLists">
            <f-button
                class="u-spacingBottom--large"
                v-for="(icon, index) in list"
                :key="index"
                :buttonType="icon.type"
                :buttonSize="icon.size"
                :actionType="actionType"
                :href="href"
                :isIcon="true"
                :isLoading="isLoading">
                <CrossIcon />
                <span class="is-visuallyHidden">
                    {{ icon.text }}
                </span>
            </f-button>

            <f-button
                class="u-spacingBottom--large"
                v-for="(icon, index) in list"
                :key="index"
                :buttonType="icon.type"
                :buttonSize="icon.size"
                :actionType="actionType"
                :href="href"
                :isIcon="true"
                :isLoading="isLoading">
                <PlusIcon />
                <span class="is-visuallyHidden">
                    {{ icon.text }}
                </span>
            </f-button>

            <f-button
                class="u-spacingBottom--large"
                v-for="(icon, index) in list"
                :key="index"
                :buttonType="icon.type"
                :buttonSize="icon.size"
                :actionType="actionType"
                :href="href"
                :isIcon="true"
                :isLoading="isLoading">
                <MoreVerticalIcon />
                <span class="is-visuallyHidden">
                    {{ icon.text }}
                </span>
            </f-button>
        </div>
    </div>`
});
IconButtonComponent.argTypes = {
    isLoading: SharedButtonArgTypes.isLoading,
    href: SharedButtonArgTypes.href,
    actionType: {
        control: { type: 'select', options: ['button', 'submit', 'reset'] },
        description: 'Choose the action type of the button',
        defaultValue: 'button'
    }
};

IconButtonComponent.args = {
    iconButtonLists: [
        [
            { type: 'primary', size: 'large', text: 'Large Primary Icon Button' },
            { type: 'primary', size: 'medium', text: 'Medium Primary Icon Button' },
            { type: 'primary', size: 'small', text: 'Small Primary Icon Button' },
            { type: 'primary', size: 'xsmall', text: 'Xsmall Primary Icon Button' }
        ],
        [
            { type: 'secondary', size: 'large', text: 'Large Secondary Icon Button' },
            { type: 'secondary', size: 'medium', text: 'Medium Secondary Icon Button' },
            { type: 'secondary', size: 'small', text: 'Small Secondary Icon Button' },
            { type: 'secondary', size: 'xsmall', text: 'Xsmall Secondary Icon Button' }
        ],
        [
            { type: 'ghost', size: 'large', text: 'Large Ghost Icon Button' },
            { type: 'ghost', size: 'medium', text: 'Medium Ghost Icon Button' },
            { type: 'ghost', size: 'small', text: 'Small Ghost Icon Button' },
            { type: 'ghost', size: 'xsmall', text: 'Xsmall Ghost Icon Button' }
        ],
        [
            { type: 'ghostTertiary', size: 'large', text: 'Large Ghost Tertiary Icon Button' },
            { type: 'ghostTertiary', size: 'medium', text: 'Medium Ghost Tertiary Icon Button' },
            { type: 'ghostTertiary', size: 'small', text: 'Small GhostTertiary Icon Button' },
            { type: 'ghostTertiary', size: 'xsmall', text: 'Xsmall Ghost Tertiary Icon Button' }
        ],
        [
            { type: 'inverse', size: 'large', text: 'Large Inverse Icon Button' },
            { type: 'inverse', size: 'medium', text: 'Medium Inverse Icon Button' },
            { type: 'inverse', size: 'small', text: 'Small Inverse Icon Button' },
            { type: 'inverse', size: 'xsmall', text: 'Xsmall Inverse Icon Button' }
        ],
        [
            { type: 'ghostInverse', size: 'large', text: 'Large Ghost Inverse Icon Button' },
            { type: 'ghostInverse', size: 'medium', text: 'Medium Ghost Inverse Icon Button' },
            { type: 'ghostInverse', size: 'small', text: 'Small Ghost Inverse Icon Button' },
            { type: 'ghostInverse', size: 'xsmall', text: 'Xsmall Ghost Inverse Icon Button' }
        ]
    ]
};

IconButtonComponent.storyName = 'Icon Button';

