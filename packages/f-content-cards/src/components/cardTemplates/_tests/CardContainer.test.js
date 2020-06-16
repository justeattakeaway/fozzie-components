import { createLocalVue, shallowMount } from '@vue/test-utils';
import VueLazyload from 'vue-lazyload';
import CardContainer from '../CardContainer.vue';

const localVue = createLocalVue();

localVue.use(VueLazyload);

const url = '__URL__';
const button = '__BUTTON__';
const line1 = '__LINE_1__';
const description = '__DESCRIPTION__';
const id = btoa('ABC123');
const type = 'Promotion_Card_1';

const card = {
    id,
    url,
    button,
    description,
    extras: {
        button_1: button, // eslint-disable-line camelcase
        custom_card_type: type, // eslint-disable-line camelcase
        line_1: line1 // eslint-disable-line camelcase
    }
};

describe('ContentCard', () => {
    it('should render a link if ctaUrl is provided', () => {
        // Act
        const wrapper = shallowMount(CardContainer, {
            localVue,
            propsData: {
                card
            }
        });

        // Assert
        expect(wrapper.find('a').exists()).toBe(true);
    });

    it('should display description lines', () => {
        // Arrange & Act
        const wrapper = shallowMount(CardContainer, {
            localVue,
            propsData: {
                card
            }
        });

        // Assert
        expect(wrapper.find('[data-test-id="ContentCard-TextItem-0"').text()).toBe(line1);
    });

    it('should apply the correct URL', () => {
        // Arrange & Act
        const wrapper = shallowMount(CardContainer, {
            localVue,
            propsData: {
                card
            }
        });

        // Assert
        expect(wrapper.find(`[href="${url}"]`).exists()).toBe(true);
    });
});
