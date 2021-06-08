import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Error from '../Error.vue';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('Error', () => {
    let wrapper;

    beforeEach(() => {
        // Arrange & Act
        wrapper = shallowMount(Error, {
            localVue,
            propsData: {
                header: 'Test header',
                description: 'Test description'
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
