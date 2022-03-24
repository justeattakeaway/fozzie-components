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

        describe('href :: ', () => {
            it('should have filter `href` value', () => {
                // Arrange
                const propsData = { href: '/area/cf10-cardiff/?refine=low_delivery_fee' };

                // Act
                const wrapper = shallowMount(FilterPill, {
                    propsData
                });

                const link = wrapper.find('[data-test-id="filter-pill-link"]');

                // Assert
                expect(link.attributes('href')).toBe(propsData.href);
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

        describe('screenReaderMessage :: ', () => {
            it('Should render the screen reader message in a visually hidden element', () => {
                // Arrange
                const propsData = { screenReaderMessage: 'A screen reader message' };

                // Act
                const wrapper = shallowMount(FilterPill, {
                    propsData
                });

                const element = wrapper.find('[data-test-id="filter-pill-sr-msg"]');

                // Assert
                expect(element.text()).toBe(propsData.screenReaderMessage);
                expect(element.classes().includes('is-visuallyHidden')).toBe(true);
            });

            it('should apply `aria-hidden` attributes to the `displayText` and `displayNumber` if provided', () => {
                // Arrange
                const propsData = { screenReaderMessage: 'A screen reader message' };

                // Act
                const wrapper = shallowMount(FilterPill, {
                    propsData
                });

                const displayTextElement = wrapper.find('[data-test-id="filter-pill-text"]');
                const displayNumberElement = wrapper.find('[data-test-id="filter-pill-number"]');

                // Assert
                expect(displayTextElement.attributes()['aria-hidden']).toStrictEqual('true');
                expect(displayNumberElement.attributes()['aria-hidden']).toStrictEqual('true');
            });

            it('should not apply `aria-hidden` attributes to the `displayText` and `displayNumber` if not provided', () => {
                // Arrange
                const propsData = { screenReaderMessage: null };

                // Act
                const wrapper = shallowMount(FilterPill, {
                    propsData
                });

                const displayTextElement = wrapper.find('[data-test-id="filter-pill-text"]');
                const displayNumberElement = wrapper.find('[data-test-id="filter-pill-number"]');

                // Assert
                expect(displayTextElement.attributes()['aria-hidden']).toBe(undefined);
                expect(displayNumberElement.attributes()['aria-hidden']).toBe(undefined);
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

    describe('checked :: ', () => {
        it('should have a true checked state when filter is selected', () => {
            // Arrange
            const propsData = { isSelected: true };

            // Act
            const wrapper = shallowMount(FilterPill, {
                propsData
            });

            const { checked } = wrapper.find('input').element;

            // Assert
            expect(checked).toBe(true);
        });

        it('should have a false checked state when filter is not selected', () => {
            // Arrange
            const propsData = { isSelected: false };

            // Act
            const wrapper = shallowMount(FilterPill, {
                propsData
            });

            const { checked } = wrapper.find('input').element;

            // Assert
            expect(checked).toBe(false);
        });

        it('should have a true checked state when filter is clicked', () => {
            // Arrange & Act
            const wrapper = shallowMount(FilterPill);

            const inputEl = wrapper.find('input');

            inputEl.trigger('click');

            const { checked } = inputEl.element;

            // Assert
            expect(checked).toBe(true);
        });
    });
});
