// Uncomment the import below to add prop controls to your Story (and add `withKnobs` to the decorators array)
// import {
//     withKnobs, select, boolean
// } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import Tabs from '../src/components/Tabs.vue';
import Tab from '../src/components/Tab.vue';

export default {
    title: 'Components/Molecules',
    decorators: [withA11y]
};

export const VueTabsComponent = (args, { argTypes }) => ({
    components: { Tabs, Tab },

    props: Object.keys(argTypes),

    template: `
        <tabs :animate="true">
            <tab name="a" title="Your Stampcards" :selected="'a' === selected">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti
                temporibus deleniti quas dolor eos et delectus eveniet sequi dolore,
                minus vel ad nesciunt voluptatibus numquam nulla distinctio modi,
                voluptas exercitationem?
            </tab>
            <tab name="b" :title="tabTitle" :selected="'b' === selected">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi eaque
                dicta quisquam voluptate inventore repellendus ut itaque, animi, magni
                consectetur dolore, sapiente error! Eos cupiditate harum quidem sit illo
                dicta!
            </tab>
        </tabs>
    `
});

VueTabsComponent.storyName = 'f-tabs';
VueTabsComponent.args = {
    selected: 'a',
    tabTitle: 'How it works'
};
VueTabsComponent.argTypes = {
    selected: { control: { type: 'radio', options: ['a', 'b'] } },
    tabTitle: { control: { type: 'text' } }
};
