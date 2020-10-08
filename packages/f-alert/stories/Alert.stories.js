import { storiesOf } from '@storybook/vue';
import VueAlert from '../src/components/Alert.vue';
import VueCard from '../../f-card/src/components/Card.vue';


storiesOf('Components', module)
  .add('f-alert', () => ({
    components: { VueAlert, VueCard },
    template: `
      <vue-card
        locale="en-GB"
        is-rounded
        has-outline
        is-page-content-wrapper>
        <vue-alert
            locale="en-GB"
            type="danger"
            :isDismissable="true">
            <template v-slot:heading>Title of the alert</template>
            <template v-slot:content>You can put any HTML here, buddy.</template>
        </vue-alert>
        <p>
            Mollit aliqua labore excepteur voluptate consequat ut dolore
            ipsum nostrud magna elit proident laboris. Irure do nulla
            eiusmod aliquip enim qui deserunt Lorem. Dolore eu exercitation
            fugiat tempor laborum consequat eu dolor voluptate reprehenderit tempor incididunt in.
            Fugiat cillum laborum irure ea id deserunt quis est deserunt reprehenderit magna ea consectetur.
            Magna ullamco eu et Lorem.
        </p>
      </vue-card>`
  })
);
