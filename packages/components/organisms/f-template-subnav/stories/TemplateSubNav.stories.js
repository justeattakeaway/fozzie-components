import { withA11y } from '@storybook/addon-a11y';
import TemplateSubNav from '../src/components/TemplateSubNav.vue';

export default {
    title: 'Components/Organisms',
    decorators: [withA11y]
};

export const TemplateSubNavComponent = () => ({
    components: { TemplateSubNav },
    props: {},
    template: '<template-subnav v-bind="$props" />'
});

TemplateSubNavComponent.storyName = 'f-template-subnav';
