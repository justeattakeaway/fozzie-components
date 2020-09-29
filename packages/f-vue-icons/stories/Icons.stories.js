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
    template: `<div class="s-icons">
        <template v-for="(component, componentName) in icons">
            <div class="s-icons-cell"><span>{{ componentName }}</span></div>
            <div class="s-icons-cell"><component :is="component" class="s-icons-icon" /></div>
        </template>
    </div>`,
    data: () => ({
        icons
    })
});

Icons.storyName = 'f-vue-icons';
