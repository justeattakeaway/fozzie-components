import { withA11y } from '@storybook/addon-a11y';
import {
    CloseSmallIcon,
    PlusSmallIcon,
    MoreVerticalSmallIcon
} from '@justeattakeaway/pie-icons-vue';
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
                { name: 'Grey', value: '#efedea' }
            ],
            default: 'White'
        }
    }
};

export const IconButtonComponent = (args, { argTypes }) => ({
    components: {
        FButton,
        CloseSmallIcon,
        PlusSmallIcon,
        MoreVerticalSmallIcon
    },
    props: Object.keys(argTypes),
    template: `
    <div>
        <div class="u-spacingBottom--large u-spacingTop storybook-grid storybook-grid-columns--4 storybook-grid-stack--lessThanWide"
        v-for="(list, index) in iconButtonLists">
            <div v-for="(icon, index) in list" :key="index">
            <f-button
                class="u-spacingBottom--large"
                :buttonType="icon.type"
                :buttonSize="icon.size"
                :actionType="actionType"
                :href="href"
                :isIcon="true"
                :isLoading="isLoading">
                <CloseSmallIcon />
            </f-button>
            <div class="u-spacingBottom--large u-spacingTop" v-if="showIconButtonName">
                {{ icon.text }}
            </div>

            <f-button
                class="u-spacingBottom--large"
                :buttonType="icon.type"
                :buttonSize="icon.size"
                :actionType="actionType"
                :href="href"
                :isIcon="true"
                :isLoading="isLoading">
                <PlusSmallIcon />
                <span class="is-visuallyHidden">
                    {{ icon.text }}
                </span>
            </f-button>
            <div class="u-spacingBottom--large u-spacingTop" v-if="showIconButtonName">
                {{ icon.text }}
            </div>

            <f-button
                class="u-spacingBottom--large"
                :buttonType="icon.type"
                :buttonSize="icon.size"
                :actionType="actionType"
                :href="href"
                :isIcon="true"
                :isLoading="isLoading">
                <MoreVerticalSmallIcon />
                <span class="is-visuallyHidden">
                    {{ icon.text }}
                </span>
            </f-button>
            <div class="u-spacingBottom--large u-spacingTop" v-if="showIconButtonName">
                {{ icon.text }}
            </div>
            </div>
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
    },
    showIconButtonName: {
        control: { type: 'select', options: [true, false] },
        description: 'Show the name of the button icon',
        defaultValue: false
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

