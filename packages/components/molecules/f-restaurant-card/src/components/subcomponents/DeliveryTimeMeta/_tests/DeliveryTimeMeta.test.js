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
            eta: 'foo',
            distance: 'bar',
            address: 'baz'
        };

        // act
        const wrapper = mount(sut, { propsData });

        const visibleText = wrapper.text();
        const etaExists = wrapper.find('[data-test-id="delivery-meta-eta"]').exists();

        // assert
        expect(visibleText).toBe('foo');
        expect(etaExists).toBe(true);
    });

    it('should fallback to distance when eta data is missing', () => {
        // arrange
        const propsData = {
            distance: 'bar',
            address: 'baz'
        };

        // act
        const wrapper = mount(sut, { propsData });

        const visibleText = wrapper.text();
        const distanceExists = wrapper.find('[data-test-id="delivery-meta-distance"]').exists();

        // assert
        expect(visibleText).toBe('bar');
        expect(distanceExists).toBe(true);
    });

    it('should fallback to address when eta and distance data is missing', () => {
        // arrange
        const propsData = {
            address: 'baz'
        };

        // act
        const wrapper = mount(sut, { propsData });

        const visibleText = wrapper.text();
        const addressExists = wrapper.find('[data-test-id="delivery-meta-address"]').exists();

        // assert
        expect(visibleText).toBe('baz');
        expect(addressExists).toBe(true);
    });

    describe('Tile view', () => {
        it('should hide eta icon but show text', () => {
            // arrange
            const propsData = {
                eta: 'foo'
            };

            // act
            const wrapper = mount(sut, { propsData });

            const etaText = wrapper.text();
            const etaIconExists = wrapper.find('[data-test-id="delivery-meta-eta-icon"]').exists();

            // assert
            expect(etaText).toBeTruthy();
            expect(etaIconExists).toBe(false);
        });

        it('should hide distance icon but show text', () => {
            // arrange
            const propsData = {
                distance: 'foo'
            };

            // act
            const wrapper = mount(sut, { propsData });

            const distanceText = wrapper.text();
            const distanceIconExists = wrapper.find('[data-test-id="delivery-meta-distance-icon"]').exists();

            // assert
            expect(distanceText).toBeTruthy();
            expect(distanceIconExists).toBe(false);
        });

        it('should show address icon and text', () => {
            // arrange
            const propsData = {
                address: 'foo'
            };

            // act
            const wrapper = mount(sut, { propsData });

            const addressText = wrapper.text();
            const addressIconExists = wrapper.find('[data-test-id="delivery-meta-address-icon"]').exists();

            // assert
            expect(addressText).toBeTruthy();
            expect(addressIconExists).toBe(true);
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

            const etaText = wrapper.text();
            const etaIconExists = wrapper.find('[data-test-id="delivery-meta-eta-icon"]').exists();

            // assert
            expect(etaText).toBeTruthy();
            expect(etaIconExists).toBe(true);
        });

        it('should show distance icon and text', () => {
            // arrange
            const propsData = {
                distance: 'foo'
            };

            // act
            const wrapper = mount(sut, { propsData });

            const distanceText = wrapper.text();
            const distanceIconExists = wrapper.find('[data-test-id="delivery-meta-distance-icon"]').exists();

            // assert
            expect(distanceText).toBeTruthy();
            expect(distanceIconExists).toBe(true);
        });

        it('should show address icon and text', () => {
            // arrange
            const propsData = {
                address: 'foo'
            };

            // act
            const wrapper = mount(sut, { propsData });

            const addressText = wrapper.text();
            const addressIconExists = wrapper.find('[data-test-id="delivery-meta-address-icon"]').exists();

            // assert
            expect(addressText).toBeTruthy();
            expect(addressIconExists).toBe(true);
        });
    });
});
