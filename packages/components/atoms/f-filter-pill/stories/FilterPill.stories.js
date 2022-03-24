import { withA11y } from '@storybook/addon-a11y';
import FilterPill from '../src/components/FilterPill.vue';

export default {
    title: 'Components/Atoms',
    decorators: [withA11y]
};

export const FilterPillComponent = (args, { argTypes }) => ({
    components: { FilterPill },
    props: Object.keys(argTypes),
    template: '<filter-pill v-bind="$props"/>'
});

FilterPillComponent.argTypes = {
    inputId: {
        control: { type: 'text' },
        description: 'Filter pill input id',
        defaultValue: '0242ac120002'
    },
    toggleValue: {
        control: { type: 'text' },
        description: 'Filter pill toggle value',
        defaultValue: 'low_delivery_fee'
    },
    href: {
        control: { type: 'text' },
        description: 'Filter pill href value',
        defaultValue: '/area/cf10-cardiff/?refine=low_delivery_fee'
    },
    isSelected: {
        control: { type: 'boolean' },
        description: 'Marks the filter as selected',
        defaultValue: false
    },
    isDisabled: {
        control: { type: 'boolean' },
        description: 'Marks the filter as disabled',
        defaultValue: false
    },
    displayText: {
        control: { type: 'text' },
        description: 'Displays filter text',
        defaultValue: 'Low Delivery Fee'
    },
    displayNumber: {
        control: { type: 'number' },
        description: 'Displays filter number',
        defaultValue: 15
    },
    isLoading: {
        control: { type: 'boolean' },
        description: 'Indicates whether or not to display a loading state',
        defaultValue: false
    },
    screenReaderMessage: {
        control: { type: 'text' },
        description: 'An optional message to read on screen readers',
        defaultValue: 'Low Delivery Fee, 15 restaurants'
    }
};

FilterPillComponent.storyName = 'f-filter-pill';
