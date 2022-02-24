import { withA11y } from '@storybook/addon-a11y';
import FilterPill from '../src/components/FilterPill.vue';

export default {
    title: 'Components/Atoms',
    decorators: [withA11y]
};

export const FilterPillComponent = (args, { argTypes }) => ({
    components: { FilterPill },
    props: Object.keys(argTypes),
    template: `<filter-pill
                    :input-id='inputId'
                    :is-selected='isSelected'
                    :is-disabled='isDisabled'
                    :display-text='displayText'
                    :display-number='displayNumber'
                ></filter-pill>`
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
        control: { type: 'text' },
        description: 'Displays filter number',
        defaultValue: '15'
    }
};

FilterPillComponent.storyName = 'f-filter-pill';
