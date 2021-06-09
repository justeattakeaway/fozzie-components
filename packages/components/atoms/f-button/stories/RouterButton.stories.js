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

const Foo = { template: '<div>foo</div>' };
const Bar = { template: '<div>bar</div>' };

const routes = [
    {
        path: '/foo',
        component: Foo,
        name: 'foo'
    },
    {
        path: '/bar',
        component: Bar,
        name: 'bar'
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
            default: text('to', '/foo')
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
