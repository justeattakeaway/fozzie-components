import { createLocalVue, mount } from '@vue/test-utils';
import VueI18n from 'vue-i18n';
import Terms from '../Terms.vue';
import i18nMocker from './helper';
import tenantConfigs from '../../tenants';

const localVue = createLocalVue();
localVue.use(VueI18n);

let messages;

beforeEach(() => {
    jest.resetAllMocks();

    messages = {
        'en-GB': tenantConfigs['en-GB'].messages,
        'en-AU': tenantConfigs['en-AU'].messages
    };
});

const setupTerms = locale => {
    // Arrange
    const component = {
        name: 'mockWrapper',
        components: {
            Terms
        },
        template: `
            <div>
                <terms :terms-url="$t('termsUrl')" :terms-text="$t('termsText')" />
            </div>`
    };

    const i18n = {
        locale,
        messages
    };

    return mount(component, {
        localVue,
        i18n,
        mocks: {
            $t: key => i18nMocker(key, i18n.locale)
        }
    });
};

describe('Terms.vue', () => {
    it.each([
        'en-GB',
        'en-AU'
    ])('should render the correct text for the link', key => {
        // Arrange
        const wrapper = setupTerms(key);

        // Act
        const link = wrapper.find('[data-test-id="terms-and-conditions"]');

        // Assert
        expect(link.text()).toEqual(messages[key].termsText);
    });

    it.each([
        'en-GB',
        'en-AU'
    ])('should render the terms url in the href attribute', key => {
        // Arrange
        const wrapper = setupTerms(key);

        // Act
        const link = wrapper.find('[data-test-id="terms-and-conditions"]');
        const href = link.attributes('href');

        // Assert
        expect(href).toEqual(messages[key].termsUrl);
    });
});
