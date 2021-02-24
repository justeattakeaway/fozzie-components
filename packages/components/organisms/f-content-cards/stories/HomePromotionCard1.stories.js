import { HomePromotionCard1 } from '../src/components/cardTemplates/homePromotionCard';
import icon from './images/mcdelivery-logo.png';
import image from './images/burger-placeholder.jpg';


export default {
    title: 'Components/Molecules/f-content-cards',
    argTypes: {
        title: {
            control: { type: 'text' },
            description: 'Title text for the inner card'
        },
        description: {
            control: { type: 'array', separator: '--' },
            description: 'Individual lines for the text in the inner card, lines separated by "--"'
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
        backgroundColor: {
            control: { type: 'text' },
            description: 'A custom css-compatible colour value given from CRM via braze for the left/top portion of the card'
        },
        contentBackgroundColor: {
            control: { type: 'text' },
            description: 'A custom css-compatible colour value given from CRM via braze for the right/inner portion of the card'
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
 *      HomePromotionCard1Component: {Object}
 *  },
 *  provide: {Function},
 *  props: string[]
 * }}
 */
export const HomePromotionCard1Component = (args, { argTypes }) => ({
    components: {
        HomePromotionCard: HomePromotionCard1
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

    template: '<home-promotion-card'
        // Setting key as per below forces re-render of the component when the supplied controls change
        // eslint-disable-next-line no-template-curly-in-string
        + ' :key="`${title},${backgroundColor},${contentBackgroundColor},${ctaText},${description},${image},${icon},${url},${subtitle}`"'
        + ' :card="{title, backgroundColor, contentBackgroundColor, ctaText, description, image, icon, url, subtitle}"'
        + '/>'
});

HomePromotionCard1Component.storyName = 'home-promotion-card-1';


HomePromotionCard1Component.args = {
    title: 'Treat them with a Just Eat gift card',
    backgroundColor: '#da0006',
    contentBackgroundColor: 'white',
    description: [
        'Whether you want to treat Mum to her Friday night favourite ',
        ' or surprise your mate with a ‘KFC on me’ ',
        ' show them you care – the tasty way.'
    ],
    image,
    icon,
    ctaText: 'Purchase now',
    subtitle: 'Only from Just Eat',
    url: '#'
};
