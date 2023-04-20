import { shallowMount } from '@vue/test-utils';
import * as uuid from 'uuid';
import ToggleSwitch from '../ToggleSwitch.vue';

jest.mock('uuid');

describe('ToggleSwitch', () => {
    it('should be defined', () => {
        const propsData = {};
        const wrapper = shallowMount(ToggleSwitch, { propsData });
        expect(wrapper.exists()).toBe(true);
    });

    describe('computed :: ', () => {
        describe('uniqueId ::', () => {
            const id = 'test-id';
            const name = 'test-name';

            it('should contain name when given', () => {
                // Arrange & Act
                const wrapper = shallowMount(ToggleSwitch, {
                    attrs: { name }
                });

                // Assert
                expect(wrapper.vm.uniqueId).toContain(name);
            });

            it('should contain id when given', () => {
                // Arrange & Act
                const wrapper = shallowMount(ToggleSwitch, {
                    attrs: { id }
                });

                // Assert
                expect(wrapper.vm.uniqueId).toContain(id);
            });

            it('should contain both name and id when given', () => {
                // Arrange & Act
                const wrapper = shallowMount(ToggleSwitch, {
                    attrs: { id, name }
                });

                // Assert
                expect(wrapper.vm.uniqueId).toContain(id);
                expect(wrapper.vm.uniqueId).toContain(name);
            });
        });
    });

    describe('created ::', () => {
        describe('when invoked', () => {
            it('should invoke `uuid` so unique IDs within the form match when the component renders serverside', () => {
                // Arrange
                const spyUniqueId = jest.spyOn(uuid, 'v4');

                // Act
                shallowMount(ToggleSwitch);

                // Assert
                expect(spyUniqueId).toHaveBeenCalled();
            });
        });
    });
});
