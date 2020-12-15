import { HomePromotionCard2 } from '../src/components/cardTemplates/homePromotionCard';
import image from './images/burger-placeholder.jpg';


export default {
    title: 'Components/Atoms/f-content-cards',
    argTypes: {
        title: { control: { type: 'text' } },
        description: { control: { type: 'array', separator: '--' } },
        image: { control: { type: 'text' } },
        icon: { control: { type: 'text' } },
        ctaText: { control: { type: 'text' } },
        backgroundColor: { control: { type: 'text' } },
        contentContainerBackground: { control: { type: 'text' } },
        url: { control: { type: 'text' } },
        tenant: { control: { type: 'radio', options: ['uk', 'au', 'nz'] } }
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
            emitCardView () {},
            emitCardClick () {}
        };
    },

    template: '<home-promotion-card'
        // Setting key as per below forces re-render of the component when the supplied controls change
        // eslint-disable-next-line no-template-curly-in-string
        + ' :key="`${title},${backgroundColor},${contentBackgroundColor},${ctaText},${description},${image},${url},${tenant}`"'
        + ' :card="{title, backgroundColor, contentBackgroundColor, ctaText, description, image, url}"'
        + ' :tenant="tenant" '
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
    url: '#',
    tenant: 'uk'
};
