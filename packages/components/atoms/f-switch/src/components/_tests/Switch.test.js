import { shallowMount } from '@vue/test-utils';
import * as uuid from 'uuid';
import FSwitch from '../Switch.vue';

jest.mock('uuid');

describe('Switch', () => {
    it('should be defined', () => {
        const propsData = {};
        const wrapper = shallowMount(FSwitch, { propsData });
        expect(wrapper.exists()).toBe(true);
    });

    describe('computed :: ', () => {
        describe('uniqueId ::', () => {
            const id = 'test-id';
            const name = 'test-name';

            it('should contain name when given', () => {
                // Arrange & Act
                const wrapper = shallowMount(FSwitch, {
                    attrs: { name }
                });

                // Assert
                expect(wrapper.vm.uniqueId).toContain(name);
            });

            it('should contain id when given', () => {
                // Arrange & Act
                const wrapper = shallowMount(FSwitch, {
                    attrs: { id }
                });

                // Assert
                expect(wrapper.vm.uniqueId).toContain(id);
            });

            it('should contain both name and id when given', () => {
                // Arrange & Act
                const wrapper = shallowMount(FSwitch, {
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
                shallowMount(FSwitch);

                // Assert
                expect(spyUniqueId).toHaveBeenCalled();
            });
        });
    });
});
