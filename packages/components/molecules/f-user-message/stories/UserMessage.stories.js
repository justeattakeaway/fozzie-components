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
    template: '<user-message locale="en-GB" />'
});

UserMessageComponent.storyName = 'f-user-message';
