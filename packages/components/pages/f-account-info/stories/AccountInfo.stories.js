// Uncomment the import below to add prop controls to your Story (and add `withKnobs` to the decorators array)
// import {
//     withKnobs, select, boolean
// } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import AccountInfo from '../src/components/AccountInfo.vue';

export default {
    title: 'Components/Pages',
    decorators: [withA11y]
};

export const AccountInfoComponent = () => ({
    components: { AccountInfo },
    props: {
    },
    template: '<account-info is-auth-finished smart-gateway-base-url="/" />'
});

AccountInfoComponent.storyName = 'f-account-info';
