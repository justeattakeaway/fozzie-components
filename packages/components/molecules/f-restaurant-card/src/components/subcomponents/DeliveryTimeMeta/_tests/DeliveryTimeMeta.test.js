import { shallowMount, mount, config } from '@vue/test-utils';
import sut from '../DeliveryTimeMeta.vue';


describe('DeliveryTimeMeta', () => {
    it('should be defined', () => {
        // arrange
        const propsData = {
            eta: '20 - 25 min'
        };

        // act
        const wrapper = shallowMount(sut, { propsData });

        // assert
        expect(wrapper.exists()).toBe(true);
    });
    it('should show eta text when data is present', () => {
        // arrange
        const propsData = {
            eta: 'foo'
        };

        // act
        const wrapper = mount(sut, { propsData });

        const visibleText = wrapper.find('[data-test-id="icon-text-visible-text"]').text();

        // assert
        expect(visibleText).toBe('foo');
    });

    it('should fallback to distance when eta data is missing', () => {
        // arrange
        const propsData = {
            distance: 'bar'
        };

        // act
        const wrapper = mount(sut, { propsData });

        const visibleText = wrapper.find('[data-test-id="icon-text-visible-text"]').text();

        // assert
        expect(visibleText).toBe('bar');
    });

    it('should fallback to address when eta and distance data is missing', () => {
        // arrange
        const propsData = {
            address: 'baz'
        };

        // act
        const wrapper = mount(sut, { propsData });

        const visibleText = wrapper.find('[data-test-id="icon-text-visible-text"]').text();

        // assert
        expect(visibleText).toBe('baz');
    });

    it('should only show 1 Icon Text', () => {
        // arrange
        const propsData = {
            eta: 'foo',
            distance: 'bar',
            address: 'baz'
        };

        // act
        const wrapper = mount(sut, { propsData });

        const numberOfIconTextElements = wrapper.findAll('[data-test-id="icon-text-visible-text"]').length;

        // assert
        expect(numberOfIconTextElements).toBe(1);
    });

    describe('Tile view', () => {
        it('should hide eta icon but show text', () => {
            // arrange
            const propsData = {
                eta: 'foo'
            };

            // act
            const wrapper = mount(sut, { propsData });

            const etaIconExists = wrapper.findAll('[data-test-id="eta-icon-text"]>[data-test-id="icon-text-icon"]').exists();
            const etaTextExists = wrapper.findAll('[data-test-id="eta-icon-text"]>[data-test-id="icon-text-visible-text"]').exists();

            // assert
            expect(etaIconExists).toBe(false);
            expect(etaTextExists).toBe(true);
        });

        it('should hide distance icon but show text', () => {
            // arrange
            const propsData = {
                distance: 'foo'
            };

            // act
            const wrapper = mount(sut, { propsData });

            const distanceIconExists = wrapper.findAll('[data-test-id="distance-icon-text"]>[data-test-id="icon-text-icon"]').exists();
            const distanceTextExists = wrapper.findAll('[data-test-id="distance-icon-text"]>[data-test-id="icon-text-visible-text"]').exists();

            // assert
            expect(distanceIconExists).toBe(false);
            expect(distanceTextExists).toBe(true);
        });

        it('should show address icon and text', () => {
            // arrange
            const propsData = {
                address: 'foo'
            };

            // act
            const wrapper = mount(sut, { propsData });

            const addressIconExists = wrapper.findAll('[data-test-id="address-icon-text"]>[data-test-id="icon-text-icon"]').exists();
            const addressTextExists = wrapper.findAll('[data-test-id="address-icon-text"]>[data-test-id="icon-text-visible-text"]').exists();

            // assert
            expect(addressIconExists).toBe(true);
            expect(addressTextExists).toBe(true);
        });
    });

    describe('List view', () => {
        beforeAll(() => {
            config.provide = { isListItem: true };
        });

        afterAll(() => {
            config.provide = {};
        });

        it('should show eta icon and show text', () => {
            // arrange
            const propsData = {
                eta: 'foo'
            };

            // act
            const wrapper = mount(sut, { propsData });

            const etaIconExists = wrapper.findAll('[data-test-id="eta-icon-text"]>[data-test-id="icon-text-icon"]').exists();
            const etaTextExists = wrapper.findAll('[data-test-id="eta-icon-text"]>[data-test-id="icon-text-visible-text"]').exists();

            // assert
            expect(etaIconExists).toBe(true);
            expect(etaTextExists).toBe(true);
        });

        it('should show distance icon and text', () => {
            // arrange
            const propsData = {
                distance: 'foo'
            };

            // act
            const wrapper = mount(sut, { propsData });

            const distanceIconExists = wrapper.findAll('[data-test-id="distance-icon-text"]>[data-test-id="icon-text-icon"]').exists();
            const distanceTextExists = wrapper.findAll('[data-test-id="distance-icon-text"]>[data-test-id="icon-text-visible-text"]').exists();

            // assert
            expect(distanceIconExists).toBe(true);
            expect(distanceTextExists).toBe(true);
        });

        it('should show address icon and text', () => {
            // arrange
            const propsData = {
                address: 'foo'
            };

            // act
            const wrapper = mount(sut, { propsData });

            const addressIconExists = wrapper.findAll('[data-test-id="address-icon-text"]>[data-test-id="icon-text-icon"]').exists();
            const addressTextExists = wrapper.findAll('[data-test-id="address-icon-text"]>[data-test-id="icon-text-visible-text"]').exists();

            // assert
            expect(addressIconExists).toBe(true);
            expect(addressTextExists).toBe(true);
        });
    });
});
