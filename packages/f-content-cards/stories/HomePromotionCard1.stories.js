import { HomePromotionCard1 } from '../src/components/cardTemplates/homePromotionCard';
import icon from './images/mcdelivery-logo.png';
import image from './images/burger-placeholder.jpg';


export default {
    title: 'Components/Atoms/f-content-cards',
    argTypes: {
        title: { control: { type: 'text' } },
        description: { control: { type: 'text' } },
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
            emitCardView () {},
            emitCardClick () {}
        };
    },

    template: '<home-promotion-card :card="{title, backgroundColor, contentContainerBackground, ctaText, description, image, icon, url}" :tenant="tenant" />'
});

HomePromotionCard1Component.storyName = 'home-promotion-card-1';

HomePromotionCard1Component.args = {
    title: 'Treat them with a Just Eat gift card',
    backgroundColor: '#da0006',
    contentContainerBackground: 'white',
    description: 'Whether you want to treat Mum to her Friday night favourite, or surprise your mate with a ‘KFC on me’, show them you care – the tasty way.',
    image,
    icon,
    ctaText: 'Purchase now',
    url: '#',
    tenant: 'uk'
};
