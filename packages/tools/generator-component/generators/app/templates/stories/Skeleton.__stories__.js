import { withA11y } from '@storybook/addon-a11y';<% if(config.needsComponentTranslations){%>
import { locales } from '@justeat/storybook/constants/globalisation';<% }%>
import <%= name.component %> from '../src/components/<%= name.filename %>.vue';

export default {
    title: 'Components/<%= storybook.componentCategory %>',
    decorators: [withA11y]
};

export const <%= name.component %>Component = (args, { argTypes }) => ({
    components: { <%= name.component %> },

    props: Object.keys(argTypes),

    template: '<<%= name.template %> v-bind="$props" />'
});

<%= name.component %>Component.storyName = 'f-<%= name.default %>';

<%= name.component %>Component.args = {<% if(config.needsComponentTranslations) { %>
    locale: locales.gb<% } %>
};

<%= name.component %>Component.argTypes = {<% if(config.needsComponentTranslations) { %>
    locale: {
        control: { type: 'select' },
        options: [locales.gb],
        description: 'Choose a locale',
        defaultValue: locales.gb
    }<% } %>
};
