import Vue from 'vue';
import Router from 'vue-router';

import {
    withKnobs,
    select,
    boolean
} from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import FButton from '../src/components/Button.vue';

Vue.use(Router);

const exampleComponent1 = { template: '<div>Example Route 1</div>' };
const exampleComponent2 = { template: '<div>Example Route 2</div>' };

const routes = [
    {
        path: '/exampleRoute1',
        component: exampleComponent1,
        name: 'exampleRoute1'
    },
    {
        path: '/exampleRoute2',
        component: exampleComponent2,
        name: 'exampleRoute2'
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
            default: select('to', ['/exampleRoute1', '/exampleRoute2'])
        }
    },

    template: `
        <div>
            <f-button
                :buttonType="buttonType"
                :buttonSize="buttonSize"
                :disabled="disabled"
                :isFullWidth="isFullWidth"
                :to="to"
                :isIcon="false">
                Default Button Text
            </f-button>
            <router-view/>
        </div>`
});

RouterLinkComponent.storyName = 'Router Link';
