import { withA11y } from '@storybook/addon-a11y';
import RestaurantTags from '../src/components/subcomponents/RestaurantTags/RestaurantTags.vue';

export default {
    title: 'Components/Molecules/f-restaurant-card',
    decorators: [withA11y]
};

export const RestaurantTagsComponent = (args, { argTypes }) => ({
    components: { RestaurantTags },
    props: Object.keys(argTypes),
    template:  '<restaurant-tags v-bind="$props" />'
});

RestaurantTagsComponent.args = {
    tags: [{ text: 'BTA Winner' }, { text: 'Michelin Star' }, { text: 'Tried & Tasted' }, { text: 'New Ownership' }, { text: 'Delivered by Menulog' }, { text: 'A very very very super long unrealistic but necessary to test tag that hopefully never happens' }]
};

RestaurantTagsComponent.storyName = 'restaurant-tags';
