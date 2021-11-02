import { shallowMount } from '@vue/test-utils';
import FSpinner from '../Spinner.vue';

const $on = jest.fn();

describe('Spinner', () => {
    const propsData = {};

    it('should be defined', () => {
        // Arrange & Act
        const wrapper = shallowMount(FSpinner, { propsData });

        // Assert
        expect(wrapper.exists()).toBe(true);
    });

    describe('mounted :: ', () => {
        const mockFunction = expect.any(Function);
        let wrapper;

        beforeEach(() => {
            // Arrange & Act
            wrapper = shallowMount(FSpinner, {
                propsData,
                mocks: {
                    $on
                }
            });
        });

        it('should create an event listener for `stop-spinner` events', () => {
            // Assert
            expect(wrapper.vm.$on).toHaveBeenCalledWith('stop-spinner', mockFunction);
        });

        it('should create an event listener for `start-spinner` events', () => {
            // Assert
            expect(wrapper.vm.$on).toHaveBeenCalledWith('start-spinner', mockFunction);
        });
    });
});
