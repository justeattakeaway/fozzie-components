// Uncomment the import below to add prop controls to your Story (and add `withKnobs` to the decorators array)
import { withA11y } from '@storybook/addon-a11y';
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
                    :primaryButtonText="primaryButtonText"
                    :primaryButtonHref="primaryButtonHref"
                    :secondaryButtonText="secondaryButtonText"
                    :secondaryButtonHref="secondaryButtonHref">
                    <template #icon>
                        <component :is="icon" />
                    </template>
                </card-with-content>`
});

CardWithContentComponent.storyName = 'f-card-with-content';
CardWithContentComponent.args = {
    cardHeading: 'Something went wrong',
    cardDescription: 'Looks like a problem on our end, sorry. Try again soon.',
    icon: '',
    primaryButtonText: 'Go back',
    primaryButtonHref: '/',
    secondaryButtonText: '',
    secondaryButtonHref: ''
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
    primaryButtonText: { control: { type: 'text' } },
    primaryButtonHref: { control: { type: 'text' } },
    secondaryButtonText: { control: { type: 'text' } },
    secondaryButtonHref: { control: { type: 'text' } }
};
