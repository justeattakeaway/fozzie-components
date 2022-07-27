import { withA11y } from '@storybook/addon-a11y';<% if(config.needsComponentTranslations){%>
import { locales } from '@justeat/storybook/constants/globalisation';<% }%>
import <%= name.filename %> from '../src/components/<%= name.filename %>.vue';

export default {
    title: 'Components/<%= storybook.componentCategory %>',
    decorators: [withA11y]
};

export const <%= name.filename %>Component = (args, { argTypes }) => ({
    components: { <%= name.filename %> },

    props: Object.keys(argTypes),

    template: '<<%= name.default %> v-bind="$props" />'
});

<%= name.filename %>Component.storyName = 'f-<%= name.default %>';

<%= name.filename %>Component.args = {<% if(config.needsComponentTranslations) { %>
    locale: locales.gb<% } %>
};

<%= name.filename %>Component.argTypes = {<% if(config.needsComponentTranslations) { %>
    locale: {
        control: { type: 'select' },
        options: [locales.gb],
        description: 'Choose a locale',
        defaultValue: locales.gb
    }<% } %>
};
