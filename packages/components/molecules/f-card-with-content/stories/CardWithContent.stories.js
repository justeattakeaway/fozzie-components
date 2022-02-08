import { withA11y } from '@storybook/addon-a11y';
import { action } from '@storybook/addon-actions';
import {
    BagRunBgIcon,
    BagSadBgIcon,
    BagSorryBgIcon
} from '@justeat/f-vue-icons';
import CardWithContent from '../src/components/CardWithContent.vue';

export default {
    title: 'Components/Molecules',
    decorators: [withA11y]
};

export const CardWithContentComponent = (args, { argTypes }) => ({
    components: {
        BagRunBgIcon,
        BagSadBgIcon,
        BagSorryBgIcon,
        CardWithContent
    },

    props: Object.keys(argTypes),

    template: `<card-with-content
                    :card-heading="cardHeading"
                    :card-description="cardDescription"
                    :primary-button="primaryButton"
                    :secondary-button="secondaryButton"
                    @primary-button-click="primaryButtonClick"
                    @secondary-button-click="secondaryButtonClick">
                    <template #icon>
                        <component :is="icon" />
                    </template>
                </card-with-content>`,

    methods: {
        primaryButtonClick: action('primary-button-click'),

        secondaryButtonClick: action('secondary-button-click')
    }
});

CardWithContentComponent.storyName = 'f-card-with-content';
CardWithContentComponent.args = {
    cardHeading: 'Something went wrong',
    cardDescription: 'Looks like a problem on our end, sorry. Try again soon.',
    icon: '',
    primaryButton: {
        href: '/',
        text: 'Go back'
    },
    secondaryButton: null
};
CardWithContentComponent.argTypes = {
    icon: {
        control: { type: 'select' },
        options: [
            '', 'bag-sad-bg-icon', 'bag-run-bg-icon', 'bag-sorry-bg-icon'
        ]
    },
    cardHeading: { control: { type: 'text' } },
    cardDescription: { control: { type: 'text' } },
    primaryButton: { control: { type: 'object' } },
    secondaryButton: { control: { type: 'object' } }
};
