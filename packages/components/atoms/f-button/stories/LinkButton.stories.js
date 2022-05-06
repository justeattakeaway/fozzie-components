import { withA11y } from '@storybook/addon-a11y';
import { WalkingIcon } from '@justeattakeaway/pie-icons-vue';
import SharedButtonArgTypes from './sharedButtonArgTypes';
import FButton from '../src/components/Button.vue';

export default {
    title: 'Components/Atoms/f-button',
    decorators: [withA11y]
};

export const LinkButtonComponent = (args, { argTypes }) => ({
    components: {
        FButton,
        WalkingIcon
    },
    props: Object.keys(argTypes),
    template: `
    <div>
        <div class="storybook-grid storybook-grid-columns--4 storybook-grid-stack--lessThanWide">
            <f-button
                class="u-spacingRight u-spacingBottom--large"
                v-for="(button, index) in buttonList"
                :key="index"
                buttonType="link"
                :buttonSize="button.size"
                :disabled="disabled"
                :isFullWidth="isFullWidth"
                :isIcon="false"
                :isLoading="isLoading"
                :href="href"
                :hasIcon="hasIcon">
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


LinkButtonComponent.argTypes = SharedButtonArgTypes;

LinkButtonComponent.args = {
    buttonList: [
        { size: 'large', text: 'Large Link Button' },
        { size: 'medium', text: 'Medium Link Button' },
        { size: 'small', text: 'Small Link Button' },
        { size: 'xsmall', text: 'Xsmall Link Button' }
    ],
    href: 'someUrl'
};

LinkButtonComponent.storyName = 'Link Button';
