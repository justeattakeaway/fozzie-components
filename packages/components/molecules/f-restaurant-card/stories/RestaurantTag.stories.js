import { withA11y } from '@storybook/addon-a11y';
import PieTokens from '@justeat/pie-design-tokens/dist/tokens.json';
import RestaurantTag from '../src/components/subcomponents/RestaurantTags/RestaurantTag.vue';

const tagColourSchemes = {
    promoted: {
        text: PieTokens.theme.jet.color.alias.default['content-light'],
        background: PieTokens.theme.jet.color.alias.default['container-dark']
    }
};
export default {
    title: 'Components/Molecules/f-restaurant-card',
    decorators: [withA11y]
};

export const RestaurantTagComponent = (args, { argTypes }) => ({
    components: { RestaurantTag },
    props: Object.keys(argTypes),
    template:  '<restaurant-tag v-bind="$props" />'
});

RestaurantTagComponent.args = {
    text: 'Promoted',
    textColour: tagColourSchemes.promoted.text,
    backgroundColour: tagColourSchemes.promoted.background,
    ariaLabel: 'Foo bar',
    testId: 'restaurant-sponsored'
};

RestaurantTagComponent.storyName = 'restaurant-tag';
