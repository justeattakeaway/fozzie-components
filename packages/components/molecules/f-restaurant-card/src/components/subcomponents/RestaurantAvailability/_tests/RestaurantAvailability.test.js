import { mount } from '@vue/test-utils';
import { ClockSmallIcon, WalkingSmallIcon } from '@justeat/f-vue-icons';
import availabilityTypes from '../availabilityTypes';
import sut from '../RestaurantAvailability.vue';

describe('RestaurantAvailability.vue', () => {
    it('is defined', () => {
        // act
        const wrapper = mount(sut);

        // assert
        expect(wrapper.exists()).toBe(true);
    });

    it('displays the `availabilityTranslatedName` if provided', () => {
        // arrange
        const propsData = {
            availabilityTranslatedName: 'foo'
        };

        // act
        const wrapper = mount(sut, { propsData });
        const renderedText = wrapper.find('[data-test-id="restaurant-availability-type"]').text();

        // assert
        expect(renderedText).toStrictEqual(propsData.availabilityTranslatedName);
    });

    it('does not display the `availabilityTranslatedName` if not provided', () => {
        // arrange
        const propsData = {};

        // act
        const wrapper = mount(sut, { propsData });

        // assert
        expect(wrapper.find('[data-test-id="restaurant-availability-type"]').exists()).toBe(false);
    });

    it('displays the `detailsMessage` if provided', () => {
        // arrange
        const propsData = {
            detailsMessage: 'foo'
        };

        // act
        const wrapper = mount(sut, { propsData });
        const renderedText = wrapper.find('[data-test-id="restaurant-availability-detailsMessage"]').text();

        // assert
        expect(renderedText).toStrictEqual(propsData.detailsMessage);
    });

    it('does not display the `detailsMessage` if not provided', () => {
        // arrange
        const propsData = {};

        // act
        const wrapper = mount(sut, { propsData });

        // assert
        expect(wrapper.find('[data-test-id="restaurant-availability-detailsMessage"]').exists()).toBe(false);
    });

    it.each([
        [ClockSmallIcon, availabilityTypes.PREORDER],
        [WalkingSmallIcon, availabilityTypes.COLLECTION]
    ])('uses the correct icon when the `availabilityType` is %p', (expectedIcon, availabilityType) => {
        // arrange
        const propsData = {
            availabilityType
        };

        // act
        const wrapper = mount(sut, { propsData });

        // assert
        expect(wrapper.vm.icon).toStrictEqual(expectedIcon);
    });

    it.each([
        ['blue', availabilityTypes.PREORDER],
        [null, availabilityTypes.COLLECTION]
    ])('sets the color as %p when the `availabilityType` is %p', (expectedColor, availabilityType) => {
        // arrange
        const propsData = {
            availabilityType
        };

        // act
        const wrapper = mount(sut, { propsData });

        // assert
        expect(wrapper.vm.iconColor).toStrictEqual(expectedColor);
    });
});
