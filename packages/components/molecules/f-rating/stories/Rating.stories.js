import { withA11y } from '@storybook/addon-a11y';
import { locales } from '@justeat/storybook/constants/globalisation';
import Rating from '../src/components/Rating.vue';

export default {
    title: 'Components/Molecules',
    decorators: [withA11y]
};

export const RatingComponent = (args, { argTypes }) => ({
    components: { Rating },

    props: Object.keys(argTypes),

    template: `<rating
                  v-bind="$props"
                  :starRatingSize="'medium'"
                  :starRating="2.5" />`
});

RatingComponent.storyName = 'f-rating';

RatingComponent.args = {
    locale: locales.gb
};

RatingComponent.argTypes = {
    locale: {
        control: { type: 'select' },
        options: [locales.gb],
        description: 'Choose a locale',
        defaultValue: locales.gb
    }
};
