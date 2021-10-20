import { withA11y } from '@storybook/addon-a11y';
import { CollectionIcon } from '@justeat/f-vue-icons';
import ButtonArgTypes from './buttonArgTypes';
import FButton from '../src/components/Button.vue';

export default {
    title: 'Components/Atoms/f-button',
    decorators: [withA11y]
};

export const LinkButtonComponent = (args, { argTypes }) => ({
    components: {
        FButton,
        CollectionIcon
    },
    props: Object.keys(argTypes),
    template: `
    <div>
        <div class="g g--alignCenter--v g--alignSpaceAround g--stack--wide">
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


LinkButtonComponent.argTypes = ButtonArgTypes;

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
