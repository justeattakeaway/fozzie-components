import { VueI18n } from '@justeat/f-globalisation';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Error from '../Error.vue';
import { i18n } from './helpers/setup';
import { CHEKOUT_ERROR_FORM_TYPE } from '../../constants';

const localVue = createLocalVue();

localVue.use(VueI18n);

describe('Error', () => {
    let wrapper;

    beforeEach(() => {
        // Arrange & Act
        wrapper = shallowMount(Error, {
            i18n,
            localVue,
            propsData: {
                errorFormType: CHEKOUT_ERROR_FORM_TYPE.default
            }
        });
    });


    it('should be defined', () => {
        // Assert
        expect(wrapper.exists()).toBe(true);
    });

    it('should show the heading', () => {
        // Act
        const heading = wrapper.find('[data-test-id="checkout-error-page-heading"]');

        // Assert
        expect(heading.text()).toMatchSnapshot();
    });

    it('should show the description', () => {
        // Act
        const description = wrapper.find('[data-test-id="checkout-error-page-description"]');

        // Assert
        expect(description.text()).toMatchSnapshot();
    });
});
