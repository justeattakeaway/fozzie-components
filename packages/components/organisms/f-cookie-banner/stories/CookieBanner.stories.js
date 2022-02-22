import { withA11y } from '@storybook/addon-a11y';
import CookieBanner from '../src/components/CookieBanner.vue';

export default {
    title: 'Components/Organisms',
    decorators: [withA11y]
};

export const CookieBannerComponent = (args, { argTypes }) => ({
    components: { CookieBanner },
    props: Object.keys(argTypes),

    template: `<cookie-banner
        :locale="locale"
        :is-hidden="isHidden"
        :key="locale"
        :should-show-legacy-banner="shouldShowLegacyBanner"
        :should-use-grey-background="shouldUseGreyBackground"
        :nameSuffix="nameSuffix" />`
});

CookieBannerComponent.storyName = 'f-cookie-banner';

CookieBannerComponent.args = {
    locale: 'en-GB',
    isHidden: false,
    shouldShowLegacyBanner: null,
    shouldUseGreyBackground: true,
    nameSuffix: ''
};

CookieBannerComponent.argTypes = {
    locale: {
        control: { type: 'select' },
        description: 'Select a tenant',
        options: ['da-DK', 'en-AU', 'en-GB', 'en-IE', 'en-NZ', 'es-ES', 'it-IT', 'nb-NO']
    },

    isHidden: {
        control: { type: 'boolean' },
        description: 'If set to true, cookie banner is hidden from view'
    },

    shouldShowLegacyBanner: {
        control: { type: 'boolean' },
        description: 'If set to true, legacy banner is displayed'
    },

    shouldUseGreyBackground: {
        control: { type: 'boolean' },
        description: 'If set to true, re-open link uses grey background'
    },

    nameSuffix: {
        control: { type: 'text' },
        description: 'Set a cookie name suffix'
    }
};

