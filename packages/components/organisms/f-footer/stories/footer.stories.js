import VueFooter from '../src/components/Footer.vue';
import gbContent from '../data/en-GB.json';
import esContent from '../data/es-ES.json';
import itContent from '../data/it-IT.json';
import auContent from '../data/en-AU.json';
import nzContent from '../data/en-NZ.json';
import ieContent from '../data/en-IE.json';

const contents = {
    'en-AU': auContent,
    'en-GB': gbContent,
    'en-IE': ieContent,
    'en-NZ': nzContent,
    'es-ES': esContent,
    'it-IT': itContent
};

export default {
    title: 'Components/Organisms',
    parameters: {
        a11y: {
            element: '[data-test-id="footer-component"]', // root element
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
        options: ['en-GB', 'en-AU', 'en-IE', 'en-NZ', 'es-ES', 'it-IT']
    },

    showCourierLinks: {
        control: { type: 'boolean' },
        description: 'If true, courier links are displayed (if defined).'
    },

    showCountrySelector: {
        control: { type: 'boolean' },
        description: 'If true, the country selector is displayed.'
    },

    showLinksContent: {
        control: { type: 'boolean' },
        description: 'If true, the main body of links is displayed.'
    },

    content: {
        description: 'Consider changing the locale instead, as this determines which data file to read.'
    }
};
