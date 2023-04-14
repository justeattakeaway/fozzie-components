import { withA11y } from '@storybook/addon-a11y';
import SegmentedControl from '../src/components/SegmentedControl.vue';

export default {
    title: 'Components/Atoms',
    decorators: [withA11y]
};

export const SegmentedControlVariants = (args, { argTypes }) => ({
    components: {
        SegmentedControl
    },

    props: Object.keys(argTypes),

    template: `
        <div>
        <h2>Left to right</h2>
        <div>
            <h2 class="u-spacingBottom--large">Small</h2>
            <div
                class="u-spacingBottom--large"
                v-for="(list, index) in segmentedControlVariants"
                :key="'list-' + index">
                <segmentedControl
                    class="u-spacingBottom--large"
                    v-for="(segmentedControl, index) in list"
                    :key="index"
                    :screenreaderLabel="segmentedControl.screenreaderLabel"
                    :options="segmentedControl.options"
                    :size="'small'"/>
            </div>
            <h2 class="u-spacingBottom--large">Large</h2>
            <div
                class="u-spacingBottom--large"
                v-for="(list, index) in segmentedControlVariants"
                :key="'list-' + index">
                <segmentedControl
                    class="u-spacingBottom--large"
                    v-for="(segmentedControl, index) in list"
                    :key="index"
                    :screenreaderLabel="segmentedControl.screenreaderLabel"
                    :options="segmentedControl.options"
                    :size="'large'"/>
            </div>
        </div>

        <h2>Right to left</h2>
        <div dir="rtl">
            <h2 class="u-spacingBottom--large">Small</h2>
            <div
                class="u-spacingBottom--large"
                v-for="(list, index) in segmentedControlVariants"
                :key="'list-' + index">
                <segmentedControl
                    class="u-spacingBottom--large"
                    v-for="(segmentedControl, index) in list"
                    :key="index"
                    :screenreaderLabel="segmentedControl.screenreaderLabel"
                    :options="segmentedControl.options"
                    :size="'small'"/>
            </div>
            <h2 class="u-spacingBottom--large">Large</h2>
            <div
                class="u-spacingBottom--large"
                v-for="(list, index) in segmentedControlVariants"
                :key="'list-' + index">
                <segmentedControl
                    class="u-spacingBottom--large"
                    v-for="(segmentedControl, index) in list"
                    :key="index"
                    :screenreaderLabel="segmentedControl.screenreaderLabel"
                    :options="segmentedControl.options"
                    :size="'large'"/>
            </div>
        </div>
        </div>`
});

SegmentedControlVariants.storyName = 'f-segmented-control';

SegmentedControlVariants.args = {

};

SegmentedControlVariants.argTypes = {
    screenReaderlabel: { control: 'text' }
};

SegmentedControlVariants.args = {
    segmentedControlVariants: [
        [
            {
                screenreaderLabel: 'Please select a language',
                options: [
                    { label: 'EN' },
                    { label: 'DK' },
                    { label: 'FR' }
                ]
            },
            {
                screenreaderLabel: 'Please select a language',
                options: [
                    { label: 'EN', disabled: true },
                    { label: 'DK', disabled: true },
                    { label: 'FR', disabled: true }
                ]
            },
            {
                screenreaderLabel: 'Please select a language',
                options: [
                    { label: 'EN' },
                    { label: 'DK', selected: true },
                    { label: 'FR' }
                ]
            },
            {
                screenreaderLabel: 'Please select a language',
                options: [
                    { label: 'English' },
                    { label: 'Danish' },
                    { label: 'French but long' }
                ]
            }
        ]
    ]
};
