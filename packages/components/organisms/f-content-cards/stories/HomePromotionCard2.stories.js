import { HomePromotionCard2 } from '../src/components/cardTemplates/homePromotionCard';
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
        ctaText: {
            control: { type: 'text' },
            description: 'Display text used for the CTA link'
        },
        contentBackgroundColor: {
            control: { type: 'text' },
            description: 'A custom css-compatible colour value given from CRM via braze for the right/inner portion of the card'
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
 *      HomePromotionCard2Component: {Object}
 *  },
 *  provide: {Function},
 *  props: string[]
 * }}
 */
export const HomePromotionCard2Component = (args, { argTypes }) => ({
    components: {
        HomePromotionCard: HomePromotionCard2
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
        + ' :key="`${title},${contentBackgroundColor},${ctaText},${description},${image},${url}`"'
        + ' :card="{title, contentBackgroundColor, ctaText, description, image, url}"'
        + '/>'
});

HomePromotionCard2Component.storyName = 'home-promotion-card-2';

HomePromotionCard2Component.args = {
    title: 'Treat them with a Just Eat gift card',
    contentBackgroundColor: 'white',
    description: [
        'Whether you want to treat Mum to her Friday night favourite ',
        ' or surprise your mate with a ‘KFC on me’ ',
        ' show them you care – the tasty way.'
    ],
    image,
    ctaText: 'Purchase now',
    url: '#'
};
