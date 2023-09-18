import { withA11y } from '@storybook/addon-a11y';
import { locales } from '@justeat/storybook/constants/globalisation';
import SelfExclusion from '../src/components/SelfExclusion.vue';

export default {
    title: 'Components/Pages',
    decorators: [withA11y]
};

export const SelfExclusionComponent = (args, { argTypes }) => ({
    components: { SelfExclusion },

    props: Object.keys(argTypes),

    template: '<self-exclusion v-bind="$props" />'
});

SelfExclusionComponent.storyName = 'f-self-exclusion';

SelfExclusionComponent.args = {
    locale: locales.gb
};

SelfExclusionComponent.argTypes = {
    locale: {
        control: { type: 'select' },
        options: [locales.gb],
        description: 'Choose a locale',
        defaultValue: locales.gb
    }
};
