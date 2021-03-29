import { StampCardPromotionCard } from '../src/components/cardTemplates';

export default {
    title: 'Components/Molecules/f-content-cards/stamp-card-promotion-card',
    argTypes: {
        title: {
            control: { type: 'text' },
            description: 'Title text for the inner card'
        },
        image: {
            control: { type: 'text' },
            description: 'If given, a URL of the image used for the inner card'
        },
        icon: {
            control: { type: 'text' },
            description: 'If given, a URL for an icon that appears in the left/top portion of the card'
        },
        ctaText: {
            control: { type: 'text' },
            description: 'Display text used for the CTA link'
        },
        subtitle: {
            control: { type: 'text' },
            description: 'The subtitle that appears below the icon on mid-breakpoint and above only'
        },
        url: {
            control: { type: 'text' },
            description: 'The url that the CTA directs to'
        }
    }
};

/**
 * Definition for story for First Time Customer Card component
 *
 * @param {Object} args
 * @param {{argTypes: {Array}}}
 * @return {{
 *  template: string,
 *  components: {
 *      StampCardPromotionCardComponent: {Object}
 *  },
 *  provide: {Function},
 *  props: string[]
 * }}
 */
export const StampCardPromotionCardComponent = (args, { argTypes }) => ({
    components: {
        StampCardPromotionCard
    },

    props: Object.keys(argTypes),

    /**
     * Stubbed copy for injecting when supplied card information is not complete
     * @return {{emitCardView: {Function}, emitCardClick: {Function}}}
     */
    provide () {
        return {
            emitCardView () { },
            emitCardClick () { }
        };
    },

    template: '<stamp-card-promotion-card'
        // Setting key as per below forces re-render of the component when the supplied controls change
        // eslint-disable-next-line no-template-curly-in-string
        + ' :key="`${title},${ctaText},${image},${icon},${url},${subtitle}`"'
        + ' :card="{title, ctaText, image, icon, url, subtitle}"'
        + '/>'
});

StampCardPromotionCardComponent.storyName = 'stamp-card-promotion-card';


StampCardPromotionCardComponent.args = {
    title: 'An Viet',
    image: 'https://picsum.photos/seed/StampCardPromotionCard_image/384/165?blur=3',
    icon: 'https://picsum.photos/seed/StampCardPromotionCard_icon/48/48',
    ctaText: 'Order now',
    subtitle: 'Vietnamese and Asian',
    url: '#'
};
