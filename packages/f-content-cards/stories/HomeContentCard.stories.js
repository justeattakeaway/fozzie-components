import HomeContentCard from '../src/components/cardTemplates/HomeContentCard.vue';
import jeIcon from './images/je-icon.png';
import jeBackground from './images/je-marketing.png';


export default {
    title: 'Components/Atoms/f-content-cards',
    argTypes: {
        title: { control: { type: 'text' } },
        cardTitle: { control: { type: 'text' } },
        subtitle: { control: { type: 'text' } },
        image: { control: { type: 'text' } },
        icon: { control: { type: 'text' } },
        ctaText: { control: { type: 'text' } },
        backgroundColor: { control: { type: 'text' } },
        contentContainerBackground: { control: { type: 'text' } },
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
 *      HomeContentCardComponent: {Object}
 *  },
 *  provide: {Function},
 *  props: string[]
 * }}
 */
export const HomeContentCardComponent = (args, { argTypes }) => ({
    components: {
        HomeContentCard
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

    template: '<home-content-card :card="{title: cardTitle, ctaText, subtitle, image, icon}" :tenant="tenant" :title="title" />'
});

HomeContentCardComponent.storyName = 'home-content-card-1';

HomeContentCardComponent.args = {
    title: 'Promotional Offer',
    cardTitle: 'Treat them with a Just Eat gift card',
    subtitle: 'Whether you want to treat Mum to her Friday night favourite, or surprise your mate with a ‘KFC on me’, show them you care – the tasty way.',
    image: jeBackground,
    icon: jeIcon,
    ctaText: 'Purchase now',
    tenant: 'uk'
};
