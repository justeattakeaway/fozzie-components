import Vue from 'vue';
import Router from 'vue-router';

import {
    withKnobs,
    select,
    boolean,
    text
} from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import FButton from '../src/components/Button.vue';

Vue.use(Router);

const exampleComponent = { template: '<div>Example Route</div>' };

const routes = [
    {
        path: '/exampleRoute',
        component: exampleComponent,
        name: 'exampleRoute'
    }
];

export default {
    title: 'Components/Atoms/f-button',
    decorators: [withKnobs, withA11y]
};

export const RouterLinkComponent = () => ({
    components: {
        FButton
    },

    router: new Router({
        routes
    }),

    props: {
        buttonType: {
            default: select('Button Type', ['primary', 'secondary', 'outline', 'ghost', 'link'], 'primary')
        },

        buttonSize: {
            default: select('Button Size', ['xsmall', 'small', 'medium', 'large'], 'medium')
        },

        disabled: {
            default: boolean('disabled', false)
        },

        isFullWidth: {
            default: boolean('isFullWidth', false)
        },

        to: {
            default: text('to', '/exampleRoute')
        }
    },

    template: `
        <f-button
            :buttonType="buttonType"
            :buttonSize="buttonSize"
            :disabled="disabled"
            :isFullWidth="isFullWidth"
            :to="to"
            :isIcon="false">
            Default Button Text
        </f-button>`
});

RouterLinkComponent.storyName = 'RouterLink';
