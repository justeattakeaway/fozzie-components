import { shallowMount } from '@vue/test-utils';
import FormSelectionControl from '../FormSelectionControl.vue';

describe('FormSelectionControl', () => {
    let attrs;
    let propsData;

    beforeEach(() => {
        attrs = {
            disabled: null,
            id: 'uniqueId1'
        };

        propsData = {
            value: 'testValue'
        };
    });

    it('should be defined', () => {
        const wrapper = shallowMount(FormSelectionControl, { attrs });
        expect(wrapper.exists()).toBe(true);
    });

    describe('props ::', () => {
        describe('value ::', () => {
            it('should be used to set the input’s value', () => {
                // Arrange & Act
                const wrapper = shallowMount(FormSelectionControl, { propsData, attrs });

                // Assert
                expect(wrapper.find('input').element.value).toBe(propsData.value);
            });
        });
    });

    describe('methods ::', () => {
        describe('updateInput ::', () => {
            it('should emit `update` when changed', async () => {
                // Arrange
                const wrapper = shallowMount(FormSelectionControl, { propsData, attrs });

                const event = {
                    target: {
                        value: 'anotherTestValue'
                    }
                };

                // Act
                await wrapper.vm.updateInput(event);

                // Assert
                expect(wrapper.emitted('update').length).toBe(1);
            });
        });
    });
});
