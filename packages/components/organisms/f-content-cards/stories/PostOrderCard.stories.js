import PostOrderCard from '../src/components/cardTemplates/PostOrderCard.vue';

export default {
    title: 'Components/Molecules',
    argTypes: {
        headline: { control: { type: 'text' } },
        cardTitle: { control: { type: 'text' } },
        subtitle: { control: { type: 'text' } },
        image: { control: { type: 'text' } },
        icon: { control: { type: 'text' } },
        ctaText: { control: { type: 'text' } },
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
 *      PostOrderCardComponent: {Object}
 *  },
 *  provide: {Function},
 *  props: string[]
 * }}
 */
export const PostOrderCardComponent = (args, { argTypes }) => ({
    components: {
        PostOrderCard
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

    template: '<post-order-card :card="{title: cardTitle, ctaText, headline, image, icon, subtitle, url}" :tenant="tenant" />'
});

PostOrderCardComponent.storyName = 'post-order-card';

PostOrderCardComponent.args = {
    headline: 'Promotional Offer',
    cardTitle: 'Treat them with a Just Eat gift card',
    subtitle: 'Whether you want to treat Mum to her Friday night favourite, or surprise your mate with a ‘KFC on me’, show them you care – the tasty way.',
    ctaText: 'Purchase now',
    image: 'https://picsum.photos/seed/FirstTimeCustomerCard_image/384/216?blur=3',
    icon: 'https://picsum.photos/seed/FirstTimeCustomerCard_icon/48/48',
    url: '#',
    tenant: 'uk'
};

