import { shallowMount, mount, config } from '@vue/test-utils';
import DeliveryTimeMeta from '../DeliveryTimeMeta.vue';


describe('DeliveryTimeMeta', () => {
    const etaSelector = '[data-test-id="restaurant-eta"]';
    const locationSelector = '[data-test-id="restaurant-location"]';

    const etaIconSelector = '[data-test-id="restaurant-eta-icon"]';
    const distanceIconSelector = '[data-test-id="restaurant-distance-icon"]';
    const addressIconSelector = '[data-test-id="restaurant-address-icon"]';

    it('should be defined', () => {
        // arrange
        const propsData = {
            eta: '20 - 25 min'
        };

        // act
        const wrapper = shallowMount(DeliveryTimeMeta, { propsData });

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
        const wrapper = mount(DeliveryTimeMeta, { propsData });

        const visibleText = wrapper.text();
        const etaExists = wrapper.find(etaSelector).exists();

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
        const wrapper = mount(DeliveryTimeMeta, { propsData });

        const visibleText = wrapper.text();
        const distanceExists = wrapper.find(locationSelector).exists();

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
        const wrapper = mount(DeliveryTimeMeta, { propsData });

        const visibleText = wrapper.text();
        const addressExists = wrapper.find(locationSelector).exists();

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
            const wrapper = mount(DeliveryTimeMeta, { propsData });

            const etaText = wrapper.text();
            const etaIconExists = wrapper.find(etaIconSelector).exists();

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
            const wrapper = mount(DeliveryTimeMeta, { propsData });

            const distanceText = wrapper.text();
            const distanceIconExists = wrapper.find(distanceIconSelector).exists();

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
            const wrapper = mount(DeliveryTimeMeta, { propsData });

            const addressText = wrapper.text();
            const addressIconExists = wrapper.find(addressIconSelector).exists();

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
            const wrapper = mount(DeliveryTimeMeta, { propsData });

            const etaText = wrapper.text();
            const etaIconExists = wrapper.find(etaIconSelector).exists();

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
            const wrapper = mount(DeliveryTimeMeta, { propsData });

            const distanceText = wrapper.text();
            const distanceIconExists = wrapper.find(distanceIconSelector).exists();

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
            const wrapper = mount(DeliveryTimeMeta, { propsData });

            const addressText = wrapper.text();
            const addressIconExists = wrapper.find(addressIconSelector).exists();

            // assert
            expect(addressText).toBeTruthy();
            expect(addressIconExists).toBe(true);
        });
    });

    describe('performance tracking', () => {
        const performanceTrackerMock = {
            time: jest.fn()
        };

        beforeEach(() => {
            jest.resetAllMocks();
            config.provide = {
                performanceTracker: performanceTrackerMock
            };
        });

        afterEach(() => {
            config.provide = {};
        });

        it('calls the performance tracker with `tier-3` after rendering if prop value exists', async () => {
            // arrange
            const propsData = {
                performanceTracker: performanceTrackerMock
            };

            // act
            await mount(DeliveryTimeMeta, { propsData });

            // assert
            expect(performanceTrackerMock.time).toHaveBeenCalledTimes(1);
            expect(performanceTrackerMock.time).toHaveBeenCalledWith('tier-3');
        });
    });
});
