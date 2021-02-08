import { text, withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import TermsAndConditionsCard from '../src/components/cardTemplates/TermsAndConditionsCard.vue';

export default {
    title: 'Components/Molecules/f-content-cards',
    decorators: [withKnobs, withA11y]
};

/**
 * Definition for story for Terms and Conditions card component
 *
 * @return {{
 *  template: string,
 *  components: {Object}
 *  props: {Object}
 *  provide: {Function}
 * }}
 */
export const TermsAndConditionsCardComponent = () => ({
    components: {
        TermsAndConditionsCard
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
        }
    },

    /**
     * Stubbed copy for injecting when supplied card information is not complete
     * @return {{copy: {loggedInSubtitle: string, loggedInTitle: string, loggedInTermsUrl: string, loggedInTermsText: string}}}
     */
    provide () {
        return {
            copy: {
                loggedInTitle: 'Copy logged in title',
                loggedInSubtitle: 'Copy logged in subtitle',
                loggedInTermsText: 'Copy linked text',
                loggedInTermsUrl: '/copy/terms/url'
            }
        };
    },

    template: '<terms-and-conditions-card :card="{title:cardTitle,subtitle,url,ctaText:label}" />'
});

TermsAndConditionsCardComponent.storyName = 'terms-and-conditions-card';
