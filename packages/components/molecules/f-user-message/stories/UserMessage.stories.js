import { boolean } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import UserMessage from '../src/components/UserMessage.vue';

export default {
    title: 'Components/Molecules',

    decorators: [
        withA11y
    ]
};

export const UserMessageComponent = () => ({
    components: { UserMessage },
    props: {
        isFlush: {
            default: boolean('Is it flush with content around it?', true)
        }
    },
    template: '<user-message locale="en-GB" :isFlush="isFlush" />'
});

UserMessageComponent.storyName = 'f-user-message';
