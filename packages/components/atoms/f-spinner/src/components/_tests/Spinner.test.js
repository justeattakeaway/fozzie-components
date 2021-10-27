import { shallowMount } from '@vue/test-utils';
import VSpinner from '../Spinner.vue';

const $on = jest.fn();

describe('Spinner', () => {
    const propsData = {};

    it('should be defined', () => {
        // Arrange & Act
        const wrapper = shallowMount(VSpinner, { propsData });

        // Assert
        expect(wrapper.exists()).toBe(true);
    });

    describe('mounted :: ', () => {
        const mockFunction = expect.any(Function);
        let wrapper;

        beforeEach(() => {
            // Arrange & Act
            wrapper = shallowMount(VSpinner, {
                propsData,
                mocks: {
                    $on
                }
            });
        });

        it('should create an event listener for `stopSpinner` events', () => {
            // Assert
            expect(wrapper.vm.$on).toHaveBeenCalledWith('stopSpinner', mockFunction);
        });

        it('should create an event listener for `startSpinner` events', () => {
            // Assert
            expect(wrapper.vm.$on).toHaveBeenCalledWith('startSpinner', mockFunction);
        });
    });
});
