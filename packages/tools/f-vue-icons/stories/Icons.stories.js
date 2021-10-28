import { withA11y } from '@storybook/addon-a11y';

import * as IconsComponents from '../src/index';
import './icons.css';

const icons = {};

Object.keys(IconsComponents).forEach(icon => {
    icons[icon] = IconsComponents[icon];
});

export default {
    title: 'Components/Atoms',
    decorators: [withA11y]
};

export const Icons = () => ({
    components: icons,
    template: `
    <div>
    <div
        class="s-icons u-spacingBottom--large storybook-grid storybook-grid-columns--4 storybook-grid-stack--lessThanWide" 
        v-for="(component, componentName) in icons">
        <template>
            <div class="s-icons-cell u-spacingBottom--large"><component :is="component" class="s-icons-icon" /></div>
        </template>
    </div>
    </div>`,
    data: () => ({
        icons
    })
});

Icons.storyName = 'f-vue-icons';
