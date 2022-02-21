import { withA11y } from '@storybook/addon-a11y';
import RestaurantAvailability from '../src/components/subcomponents/RestaurantAvailability/RestaurantAvailability.vue';
import availabilityTypes from '../src/components/subcomponents/RestaurantAvailability/availabilityTypes';

export default {
    title: 'Components/Molecules/f-restaurant-card/Subcomponents',
    decorators: [withA11y]
};

export const RestaurantAvailabilityComponent = (args, { argTypes }) => ({
    components: { RestaurantAvailability },
    props: Object.keys(argTypes),
    template:  '<restaurant-availability v-bind="$props" />'
});

RestaurantAvailabilityComponent.args = {
    availabilityType: availabilityTypes.COLLECTION,
    availabilityTranslatedName: 'Pre-order',
    availabilityMessage: 'Opening at 13:20'
};

RestaurantAvailabilityComponent.storyName = 'restaurant-availability';
