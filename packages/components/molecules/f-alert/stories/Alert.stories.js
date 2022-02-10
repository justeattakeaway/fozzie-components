import { withA11y } from '@storybook/addon-a11y';
import VueCard from '@justeat/f-card/src/components/Card.vue';
import FAlert from '../src/components/Alert.vue';

export default {
    title: 'Components/Molecules',
    decorators: [withA11y]
};

export const AlertComponent = (args, { argTypes }) => ({
    components: { FAlert, VueCard },
    props: Object.keys(argTypes),
    template: `
    <vue-card
        locale="locale"
        has-outline
        is-page-content-wrapper>
        <f-alert
            :locale="locale"
            :type="type"
            :isDismissible="isDismissible"
            :heading="heading">
            You can put any HTML here!
        </f-alert>
        <p>
            Mollit aliqua labore excepteur voluptate consequat ut dolore
            ipsum nostrud magna elit proident laboris. Irure do nulla
            eiusmod aliquip enim qui deserunt Lorem. Dolore eu exercitation
            fugiat tempor laborum consequat eu dolor voluptate reprehenderit tempor incididunt in.
            Fugiat cillum laborum irure ea id deserunt quis est deserunt reprehenderit magna ea consectetur.
            Magna ullamco eu et Lorem.
        </p>
    </vue-card>`
});

AlertComponent.args = {
    locale: 'en-GB',
    type: 'success',
    heading: 'Title of the alert',
    isDismissible: true
};

AlertComponent.argTypes = {
    locale: {
        control: { type: 'select', options: ['en-GB', 'es-ES'] }
    },
    type: {
        control: { type: 'select', options: ['success', 'warning', 'danger', 'info'] }
    },
    heading: {
        control: { type: 'text' }
    },
    isDismissible: {
        control: { type: 'boolean' }
    }
};

AlertComponent.storyName = 'f-alert';
