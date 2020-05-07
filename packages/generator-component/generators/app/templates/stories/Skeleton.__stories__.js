import { storiesOf } from '@storybook/vue';
import <%= name.component %> from '../src/components/<%= name.filename %>.vue';

storiesOf('Components', module)
  .add('f-<%= name.default %>', () => ({
    components: { <%= name.component %> },
    template: `<<%= name.template %> />`
  })
);
