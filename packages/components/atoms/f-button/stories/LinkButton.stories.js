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

export const LinkButtonComponent = (args, { argTypes }) => ({
    components: {
        FButton,
        CollectionIcon
    },
    props: Object.keys(argTypes),
    template: `
    <div>
        <div
            style="display: flex; flex-flow: row nowrap; align-items: center; justify-content: space-around; margin-bottom: 16px;">
            <f-button
                style="margin-right: 16px;"
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


LinkButtonComponent.argTypes = {
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
    hasIcon: {
        control: { type: 'select', options: VALID_BUTTON_ICON_POSITION },
        description: 'Adds icon to the button text',
        defaultValue: false
    },
    href: {
        control: { type: 'text' },
        description: 'Should be presented for the button to become a link <a> element',
        defaultValue: ''
    }
};

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
