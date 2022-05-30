import { withA11y } from '@storybook/addon-a11y';
import VueFooter from '../src/components/Footer.vue';
import gbContent from '../data/en-GB.json';
import esContent from '../data/es-ES.json';
import itContent from '../data/it-IT.json';
import noContent from '../data/nb-NO.json';
import dkContent from '../data/da-DK.json';
import auContent from '../data/en-AU.json';
import nzContent from '../data/en-NZ.json';
import ieContent from '../data/en-IE.json';

const contents = {
    'da-DK': dkContent,
    'en-AU': auContent,
    'en-GB': gbContent,
    'en-IE': ieContent,
    'en-NZ': nzContent,
    'es-ES': esContent,
    'it-IT': itContent,
    'nb-NO': noContent
};

export default {
    title: 'Components/Organisms',
    decorators: [withA11y],
    parameters: {
        a11y: {
            element: '.c-footer', // root element
            config: {},
            options: {
                rules: {
                    'duplicate-id': { enabled: false }
                }
            }
        },
        layout: 'fullscreen'
    }
};

export const FooterComponent = (args, { argTypes }) => ({
    components: { VueFooter },

    props: Object.keys(argTypes),

    computed: {
        contentByLocale () {
            return this.showLinksContent ? contents[this.locale] : null;
        }
    },

    template: `
        <vue-footer
            style="margin-top: 300px"
            :showCourierLinks="showCourierLinks"
            :locale="locale"
            :showCountrySelector="showCountrySelector"
            :content="contentByLocale" />`
});

FooterComponent.storyName = 'f-footer';

FooterComponent.args = {
    locale: 'en-GB',
    showCourierLinks: false,
    showCountrySelector: false,
    showLinksContent: true,
    content: contents['en-GB']
};

FooterComponent.argTypes = {
    locale: {
        control: { type: 'select' },
        description: 'Select a tenant',
        options: ['en-GB', 'en-AU', 'da-DK', 'en-IE', 'en-NZ', 'es-ES', 'it-IT', 'nb-NO']
    },

    showCourierLinks: {
        control: { type: 'boolean' },
        description: 'If set to true, courier links are displayed'
    },

    showCountrySelector: {
        control: { type: 'boolean' },
        description: 'If set to true, country selector is displayed'
    },

    showLinksContent: {
        control: { type: 'boolean' },
        description: 'If set to true, content links are displayed'
    },

    content: {
        control: false // This is driven by the locale + data file combination.
    }
};
