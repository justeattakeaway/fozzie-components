import {
    withKnobs, boolean, select, object, text
} from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import VueAlert from '../src/components/Alert.vue';
import VueCard from '../../f-card/src/components/Card.vue';

export default {
    title: 'Components/Atoms',
    decorators: [withA11y]
};

export const AlertComponent = () => ({
    components: { VueAlert, VueCard },
    props: {
        locale: {
            default: select('Locale', ['en-GB', 'es-ES'])
        },
        type: {
            default: select('Type', ['success', 'warning', 'danger', 'info'], 'success')
        },
        heading: {
            default: text('Heading', 'Title of the alert')
        },
        isDismissable: {
            default: boolean('Is it dismissable?', true)
        }
    },
    template: `
    <vue-card
        locale="en-GB"
        is-rounded
        has-outline
        is-page-content-wrapper>
        <vue-alert
            :locale="locale"
            :type="type"
            :isDismissable="isDismissable"
            :heading="heading">
            You can put any HTML here!
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
});

AlertComponent.storyName = 'f-alert';
