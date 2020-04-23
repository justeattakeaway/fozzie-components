import { storiesOf } from '@storybook/vue';
import { select, boolean } from '@storybook/addon-knobs';
import <%= name.component %> from '../src/components/<%= name.filename %>.vue';

storiesOf('Shared', module)
  .add('f-<%= name.default %>', () => ({
    components: { <%= name.component %> },
    props: {
    },
    template: `<<%= name.template %> />`
  })
);
