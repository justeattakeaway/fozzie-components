import { withA11y } from '@storybook/addon-a11y';
import TermsAndConditionsCard from '../src/components/cardTemplates/TermsAndConditionsCard.vue';

export default {
    title: 'Components/Molecules/f-content-cards',
    decorators: [withA11y]
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
export const TermsAndConditionsCardComponent = (args, { argTypes }) => ({
    components: {
        TermsAndConditionsCard
    },

    props: Object.keys(argTypes),

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

    template: '<terms-and-conditions-card :card="{title,subtitle,url,ctaText}" />'
});

TermsAndConditionsCardComponent.storyName = 'terms-and-conditions-card';

TermsAndConditionsCardComponent.args = {
    title: 'T&amp;C Example Title',
    subtitle: 'Example subtitle',
    url: '/termsandconditions#ii.just-eat-voucher-terms-conditions',
    ctaText: 'See the terms and conditions'
};

TermsAndConditionsCardComponent.argTypes = {
    title: {
        control: { type: 'text' },
        description: 'Changes text of Card Title'
    },
    subtitle: {
        control: { type: 'text' },
        description: 'Changes text of Card Subtitle'
    },
    url: {
        control: { type: 'text' },
        description: 'Changes text of URL'
    },
    ctaText: {
        control: { type: 'text' },
        description: 'Changes text of label'
    }
};
