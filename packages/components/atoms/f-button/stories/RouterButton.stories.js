import Vue from 'vue';
import Router from 'vue-router';
import { withA11y } from '@storybook/addon-a11y';
import FButton from '../src/components/Button.vue';
import SharedButtonArgTypes from './sharedButtonArgTypes';

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
    decorators: [withA11y]
};

export const RouterLinkComponent = (args, { argTypes }) => ({
    components: {
        FButton
    },
    router: new Router({
        routes
    }),
    props: Object.keys(argTypes),
    template: `
        <div>
            <f-button
                :buttonType="buttonType"
                :buttonSize="buttonSize"
                :disabled="disabled"
                :isFullWidth="isFullWidth"
                :to="toLink"
                :isIcon="false">
                Default Button Text
            </f-button>
            <router-view/>
        </div>`
});

RouterLinkComponent.storyName = 'Router Link';

RouterLinkComponent.argTypes = {
    ...SharedButtonArgTypes,
    buttonType:
    {
        control: { type: 'select' },
        options: ['primary', 'secondary', 'outline', 'ghost', 'link'],
        description: 'Choose a Button Type',
        defaultValue: 'primary'
    },
    buttonSize:
    {
        control: { type: 'select' },
        options: ['xsmall', 'small', 'medium', 'large'],
        description: 'Choose a Button Size',
        defaultValue: 'medium'
    },
    hasIcon: { description: 'not available in this story' },
    href: { description: 'not available in this story' },
    isLoading: { description: 'not available in this story' },
    toLink:
    {
        control: { type: 'select' },
        options: ['/exampleRoute1', '/exampleRoute2'],
        description: 'Choose a Link',
        defaultValue: '/exampleRoute1'
    }
};
