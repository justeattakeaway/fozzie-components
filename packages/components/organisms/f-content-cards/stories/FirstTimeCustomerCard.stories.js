import FirstTimeCustomerCard from '../src/components/cardTemplates/FirstTimeCustomerCard.vue';

export default {
    title: 'Components/Molecules',
    argTypes: {
        cardTitle: { control: { type: 'text' } },
        subtitle: { control: { type: 'text' } },
        banner: { control: { type: 'text' } },
        description: { control: { type: 'text' } },
        footer: { control: { type: 'text' } },
        image: { control: { type: 'text' } },
        icon: { control: { type: 'text' } },
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
 *      FirstTimeCustomerCard: {Object}
 *  },
 *  provide: {Function},
 *  props: string[]
 * }}
 */
export const FirstTimeCustomerCardComponent = (args, { argTypes }) => ({
    components: {
        FirstTimeCustomerCard
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

    template: '<first-time-customer-card :card="{title: cardTitle, subtitle, banner, footer, image, icon, description: [description]}" :tenant="tenant" ></first-time-customer-card>'
});

FirstTimeCustomerCardComponent.storyName = 'first-time-customer-card';

FirstTimeCustomerCardComponent.args = {
    cardTitle: 'First time customer',
    subtitle: 'Order as much or as little as you like, exclusively on Just Eat.',
    banner: 'XX% discount',
    description: 'For first time customers',
    footer: 'Discount automatically applied at the basket',
    image: 'https://picsum.photos/seed/FirstTimeCustomerCard_image/384/216?blur=3',
    icon: 'https://picsum.photos/seed/FirstTimeCustomerCard_icon/48/48',
    tenant: 'uk'
};
