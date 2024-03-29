import { withA11y } from '@storybook/addon-a11y';
import Breadcrumbs from '../src/components/BreadCrumbs.vue';

export default {
    title: 'Components/Molecules',
    decorators: [withA11y]
};

export const BreadcrumbsComponent = (args, { argTypes }) => ({
    components: { Breadcrumbs },
    props: Object.keys(argTypes),
    template: '<breadcrumbs v-bind="$props" />'
});

BreadcrumbsComponent.storyName = 'f-breadcrumbs';

/**
 * Arguments without specified controls
 * @type {{routerLinks: boolean}}
 */
BreadcrumbsComponent.args = {
    hasBackground: true,

    links: [
        {
            name: 'Home',
            url: '/',
            routerLink: false
        },
        {
            name: 'For You',
            url: '/offers',
            routerLink: false
        },
        {
            name: 'Stampcards',
            url: '/offers/stamp-cards',
            routerLink: false
        }
    ]
};
