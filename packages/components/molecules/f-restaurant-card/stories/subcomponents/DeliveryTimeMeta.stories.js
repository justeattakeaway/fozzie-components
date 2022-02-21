import { withA11y } from '@storybook/addon-a11y';
import DeliveryTimeMeta from '../../src/components/subcomponents/DeliveryTimeMeta/DeliveryTimeMeta.vue';

export default {
    title: 'Components/Molecules/f-restaurant-card/Subcomponents',
    decorators: [withA11y]
};

export const DeliveryTimeMetaComponent = (args, { argTypes }) => ({
    components: { DeliveryTimeMeta },
    props: Object.keys(argTypes),
    template:  '<delivery-time-meta v-bind="$props" />'
});

DeliveryTimeMetaComponent.args = {
    address: 'Fleet Place House, 2 Fleet Pl, London EC4M 7RF, The United Kingdom of Great Britain and Northern Ireland',
    distance: '1.35 miles',
    eta: '20-25 min'
};

DeliveryTimeMetaComponent.storyName = 'delivery-time-meta';
