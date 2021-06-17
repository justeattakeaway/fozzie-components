// Uncomment the import below to add prop controls to your Story (and add `withKnobs` to the decorators array)
// import {
//     withKnobs, select, boolean
// } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import GtmAnalytics from '../src/components/Analytics.vue';

export default {
    title: 'Components/Atoms',
    decorators: [withA11y]
};

export const GtmAnalyticsComponent = () => ({
    components: { GtmAnalytics },
    props: {
    },
    template: '<gtm-analytics />'
});

GtmAnalyticsComponent.storyName = 'f-analytics';
