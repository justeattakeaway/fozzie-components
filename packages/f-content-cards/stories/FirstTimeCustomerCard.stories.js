import { text, withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import FirstTimeCustomerCard from '../src/components/cardTemplates/FirstTimeCustomerCard.vue';

export default {
    title: 'Components/Atoms/f-content-cards',
    decorators: [withKnobs, withA11y]
};

/**
 * Definition for story for First Time Customer Card component
 *
 * @return {{
 *  template: string,
 *  components: {Object}
 *  props: {Object}
 *  provide: {Function}
 * }}
 */
export const FirstTimeCustomerCardcomponent = () => ({
    components: {
        FirstTimeCustomerCard
    },

    props: {
        cardTitle: {
            default: text('Card Title', 'T&amp;C Example Title')
        },
        subtitle: {
            default: text('Card Subtitle', 'Example subtitle')
        },
        url: {
            default: text('Card URL', '/termsandconditions#ii.just-eat-voucher-terms-conditions')
        },
        label: {
            default: text('Call to Action Label', 'See the terms and conditions')
        },
        banner: {
            default: text('Card Banner', 'Banner placeholder text')
        },
        footer: {
            default: text('Card Footer', 'Footer placeholder text')
        }
    },

    /**
     * Stubbed copy for injecting when supplied card information is not complete
     * @return {{copy: {loggedInSubtitle: string, loggedInTitle: string, loggedInTermsUrl: string, loggedInTermsText: string}}}
     */
    provide () {
        return {
            emitCardView () {},
            emitCardClick () {}
        };
    },

    template: '<first-time-customer-card :card="{title:cardTitle,subtitle,url,ctaText:label,banner,footer}" />'
});

FirstTimeCustomerCardcomponent.story = {
    name: 'first-time-customer-card'
};
