import { shallowMount } from '@vue/test-utils';
import * as uuid from 'uuid';
import FToggle from '../Toggle.vue';

jest.mock('uuid');

describe('Toggle', () => {
    it('should be defined', () => {
        const propsData = {};
        const wrapper = shallowMount(FToggle, { propsData });
        expect(wrapper.exists()).toBe(true);
    });

    describe('computed :: ', () => {
        describe('uniqueId ::', () => {
            const id = 'test-id';
            const name = 'test-name';

            it('should contain name when given', () => {
                // Arrange & Act
                const wrapper = shallowMount(FToggle, {
                    attrs: { name }
                });

                // Assert
                expect(wrapper.vm.uniqueId).toContain(name);
            });

            it('should contain id when given', () => {
                // Arrange & Act
                const wrapper = shallowMount(FToggle, {
                    attrs: { id }
                });

                // Assert
                expect(wrapper.vm.uniqueId).toContain(id);
            });

            it('should contain both name and id when given', () => {
                // Arrange & Act
                const wrapper = shallowMount(FToggle, {
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
                shallowMount(FToggle);

                // Assert
                expect(spyUniqueId).toHaveBeenCalled();
            });
        });
    });
});
