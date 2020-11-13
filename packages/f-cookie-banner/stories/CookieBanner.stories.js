import {
    withKnobs, select, boolean
} from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import CookieBanner from '../src/components/CookieBanner.vue';

export default {
    title: 'Components',
    decorators: [withA11y]
};

export const CookieBannerComponent = () => ({
    components: { CookieBanner },
    props: { locale: {
        default: select('Locale', ['en-GB', 'en-IE', 'es-ES'])
    } },
    template: `<cookie-banner :locale="locale" />`
});

CookieBannerComponent.storyName = 'f-cookie-banner';
