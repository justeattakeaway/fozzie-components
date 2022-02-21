import { withA11y } from '@storybook/addon-a11y';
import { ClockIcon } from '@justeat/f-vue-icons';
import IconText from '../src/components/subcomponents/IconText.vue';

export default {
    title: 'Components/Molecules/f-restaurant-card/Subcomponents',
    decorators: [withA11y]
};

export const IconTextComponent = (args, { argTypes }) => ({
    components: { IconText, ClockIcon },
    props: Object.keys(argTypes),
    template:  `<icon-text v-bind="$props">
                    <clock-icon />
                </icon-text>`
});

IconTextComponent.args = {
    text: 'Some text',
    color: 'green',
    isBold: false,
    hideIconInTileView: false
};

IconTextComponent.storyName = 'icon-text';
