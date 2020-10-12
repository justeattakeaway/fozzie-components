import { shallowMount } from '@vue/test-utils';
import VueAlert from '../Alert.vue';

describe('Alert', () => {
    it('should be defined', () => {
        // Arrange
        const propsData = {};

        // Act
        const wrapper = shallowMount(VueAlert, { propsData });

        // Assert
        expect(wrapper.exists()).toBe(true);
    });

    describe('methods', () => {
        describe('dismiss', () => {
            it('should set `isDismissed` to `true`', () => {
                // Arrange
                const propsData = {};
                const wrapper = shallowMount(VueAlert, { propsData });

                // Act
                wrapper.vm.dismiss();

                // Assert
                expect(wrapper.vm.isDismissed).toBe(true);
            });
        });
    });
});
