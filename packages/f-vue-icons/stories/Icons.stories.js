import { withA11y } from '@storybook/addon-a11y';
import * as IconsComponents from '../dist/f-vue-icons.es';

const icons = {};

Object.keys(IconsComponents).forEach(icon => {
    icons[icon] = IconsComponents[icon];
});

export default {
    title: 'Components/Atoms/Icons',
    decorators: [withA11y]
};

export const Icons = () => ({
    components: icons,
    template: `<div style="
  display: grid;
  grid-template-columns: 50% 50%;
  justify-items: stretch;
">
        <template v-for="(component, componentName) in icons">
            <div style="border-bottom: solid 1px lightgrey; min-height: 32px;"><span>{{ componentName }}</span></div>
            <div style="border-bottom: solid 1px lightgrey; min-height: 32px;"><component :is="component" style="max-width: 50%; max-height: 32px" /></div>
        </template>
    </div>`,
    data: () => ({
        icons
    }),
    methods: {
        log: item => {
            console.log(item);
            return 'IconsLogged';
        }
    }
});

Icons.story = {
    name: 'f-vue-icons'
};
