import { text, withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import TermsAndConditionsCard from '../src/components/cardTemplates/TermsAndConditionsCard.vue';

export default {
    title: 'Components/Atoms/f-content-cards',
    decorators: [withKnobs, withA11y]
};


export const TermsAndConditionsCardcomponent = () => ({
    components: {
        TermsAndConditionsCard
    },

    props: {
        cardTitle: {
            default: text('Card Title', 'T&amp;C Example Title')
        },
        description: {
            default: text('Card Description', 'Example description')
        },
        url: {
            default: text('Card URL', '/termsandconditions#ii.just-eat-voucher-terms-conditions')
        },
        label: {
            default: text('Call to Action Label', 'See the terms and conditions')
        }
    },

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

    template: '<terms-and-conditions-card :card="{title:cardTitle,description,url,ctaLabel:label}" />'
});

TermsAndConditionsCardcomponent.story = {
    name: 'terms-and-conditions-card'
};
