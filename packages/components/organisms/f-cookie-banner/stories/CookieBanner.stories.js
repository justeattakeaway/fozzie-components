import {
    withKnobs, select, boolean, text
} from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import CookieBanner from '../src/components/CookieBanner.vue';
import '@justeat/f-button/dist/f-button.css'; // these styles are imported to fix visual regression tests
import '@justeat/f-link/dist/f-link.css'; // these styles are imported to fix visual regression tests

export default {
    title: 'Components/Organisms',
    decorators: [withKnobs, withA11y]
};

export const CookieBannerComponent = () => ({
    components: { CookieBanner },
    props: {
        locale: {
            default: select('Locale', ['da-DK', 'en-AU', 'en-GB', 'en-IE', 'en-NZ', 'es-ES', 'it-IT', 'nb-NO'])
        },

        isHidden: {
            default: boolean('Is hidden', false)
        },

        shouldShowLegacyBanner: {
            default: boolean('Show legacy banner', null)
        },

        shouldUseGreyBackground: {
            default: boolean('Reopen link uses grey background', true)
        },

        nameSuffix: {
            default: text('Cookie name suffix', '')
        }
    },
    template: `<cookie-banner
        :locale="locale"
        :is-hidden="isHidden"
        :key="locale"
        :should-show-legacy-banner="shouldShowLegacyBanner"
        :should-use-grey-background="shouldUseGreyBackground"
		:nameSuffix="nameSuffix" />`
});

CookieBannerComponent.storyName = 'f-cookie-banner';
