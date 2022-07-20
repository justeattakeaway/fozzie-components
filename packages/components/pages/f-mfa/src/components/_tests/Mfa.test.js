import { shallowMount } from '@vue/test-utils';
import sut from '../Mfa.vue';

describe('Mfa', () => {
    const baseUrl = 'https://api.test.co.uk/';
    let wrapper;

    beforeEach(() => {
        // Arrange
        const propsData = {
            smartGatewayBaseUrl: baseUrl
        };

        // Act
        wrapper = shallowMount(sut, { propsData });
    });

    it('should be defined', () => {
        // Assert
        expect(wrapper.exists()).toBe(true);
    });
});
