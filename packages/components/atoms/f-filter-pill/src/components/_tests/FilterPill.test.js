import { shallowMount } from '@vue/test-utils';
import FilterPill from '../FilterPill.vue';

describe('FilterPill', () => {
    it('should be defined', () => {
        const propsData = {};
        const wrapper = shallowMount(FilterPill, { propsData });
        expect(wrapper.exists()).toBe(true);
    });

    describe('props :: ', () => {
        describe('inputId :: ', () => {
            it('should apply `inputId` value to the input `id` attribute', () => {
                // Arrange
                const propsData = { inputId: '0242ac120002' };

                // Act
                const wrapper = shallowMount(FilterPill, {
                    propsData
                });

                const input = wrapper.find('[data-test-id="filter-pill-input"]');

                // Assert
                expect(input.attributes('id')).toContain(propsData.inputId);
            });

            it('should apply `inputId` value to the label `for` attribute', () => {
                // Arrange
                const propsData = { inputId: '0242ac120002' };

                // Act
                const wrapper = shallowMount(FilterPill, {
                    propsData
                });

                const label = wrapper.find('[data-test-id="filter-pill-label"]');

                // Assert
                expect(label.attributes('for')).toContain(propsData.inputId);
            });
        });

        describe('isSelected :: ', () => {
            it.each([
                [true, true],
                [false, false]
            ])('should update `isToggleSelected` %s when set to %s', (expectedValue, isSelected) => {
                // Arrange
                const propsData = { isSelected };

                // Act
                const wrapper = shallowMount(FilterPill, {
                    propsData
                });

                // Assert
                expect(wrapper.vm.isToggleSelected).toBe(expectedValue);
            });

            it('should update `isToggleSelected` when changed', async () => {
                // Arrange
                const wrapper = shallowMount(FilterPill, { isToggleSelected: false, isSelected: false });

                // Act
                await wrapper.vm.$options.watch.isSelected.call(wrapper.vm, true);

                // Assert
                expect(wrapper.vm.isToggleSelected).toBe(true);
            });
        });

        describe('isDisabled :: ', () => {
            it.each([
                [true, true],
                [false, false]
            ])('should update `isToggleDisabled` %s when set to %s', (expectedValue, isDisabled) => {
                // Arrange
                const propsData = { isDisabled };

                // Act
                const wrapper = shallowMount(FilterPill, {
                    propsData
                });

                // Assert
                expect(wrapper.vm.isToggleDisabled).toBe(expectedValue);
            });

            it('should update `isToggleDisabled` when changed', async () => {
                // Arrange
                const wrapper = shallowMount(FilterPill, { isToggleDisabled: false, isDisabled: false });

                // Act
                await wrapper.vm.$options.watch.isDisabled.call(wrapper.vm, true);

                // Assert
                expect(wrapper.vm.isToggleDisabled).toBe(true);
            });
        });

        describe('displayText :: ', () => {
            it('should show filter text', () => {
                // Arrange
                const propsData = { displayText: 'Low Delivery Fee' };

                // Act
                const wrapper = shallowMount(FilterPill, {
                    propsData
                });

                const element = wrapper.find('[data-test-id="filter-pill-text"]');

                // Assert
                expect(element.text()).toBe(propsData.displayText);
            });
        });

        describe('displayNumber :: ', () => {
            it('should show filter number', () => {
                // Arrange
                const propsData = { displayNumber: 15 };

                // Act
                const wrapper = shallowMount(FilterPill, {
                    propsData
                });

                const element = wrapper.find('[data-test-id="filter-pill-number"]');

                // Assert
                expect(element.text()).toBe(propsData.displayNumber.toString());
            });
        });
    });

    describe('methods :: ', () => {
        describe('toggleFilter :: ', () => {
            it('should update `isToggleSelected` value and $emit toggle event when called', async () => {
                // Arrange
                const wrapper = shallowMount(FilterPill, { isToggleSelected: false, toggleValue: 'low_delivery_fee' });
                const spy = jest.spyOn(wrapper.vm, '$emit');

                // Act
                wrapper.vm.toggleFilter();
                await wrapper.vm.$nextTick();

                // Assert
                expect(wrapper.vm.isToggleSelected).toBe(true);
                expect(spy).toHaveBeenCalledWith('toggle', wrapper.vm.toggleValue);
            });
        });
    });
});
