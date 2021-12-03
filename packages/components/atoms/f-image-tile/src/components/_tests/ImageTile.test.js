import { shallowMount } from '@vue/test-utils';
import ImageTile from '../ImageTile.vue';

describe('ImageTile', () => {
    it('should be defined', () => {
        const propsData = {};
        const wrapper = shallowMount(ImageTile, { propsData });
        expect(wrapper.exists()).toBe(true);
    });

    describe('props :: ', () => {
        describe('isLink :: ', () => {
            it('should apply `href` to anchor when true', () => {
                // Arrange
                const propsData = { isLink: true, href: 'https://www.google.com' };

                // Act
                const wrapper = shallowMount(ImageTile, {
                    propsData
                });

                const link = wrapper.find('[data-test-id="image-tile-link"]');

                // Assert
                expect(link.attributes('href')).toEqual(propsData.href);
            });

            it('should not apply `href` to anchor when false', () => {
                // Arrange
                const propsData = { isLink: false, href: 'https://www.google.com' };

                // Act
                const wrapper = shallowMount(ImageTile, {
                    propsData
                });

                const link = wrapper.find('[data-test-id="image-tile-link"]');

                // Assert
                expect(link.attributes('href')).toEqual('#');
            });
        });
    });

    xdescribe('watch:: ', () => {
        describe('isSelected:: ', () => {
            it('should update `isFilterSelected` when changed', async () => {
                // Arrange
                const wrapper = shallowMount(ImageTile, { isFilterSelected: false, isSelected: false });

                // Act
                await wrapper.setData({ isSelected: true });

                // Assert
                expect(wrapper.vm.isFilterSelected).toBe(true);
            });
        });
    });

    describe('methods :: ', () => {
        describe('toggleFilter :: ', () => {
            it('should update `isFilterSelected` value and $emit toggle event when called', async () => {
                // Arrange
                const wrapper = shallowMount(ImageTile, { isFilterSelected: false, tileId: 'chicken' });
                const spy = jest.spyOn(wrapper.vm, '$emit');
                const emitObject = { tileId: wrapper.vm.tileId };

                // Act
                wrapper.vm.toggleFilter();
                await wrapper.vm.$nextTick();

                // Assert
                expect(wrapper.vm.isFilterSelected).toBe(true);
                expect(spy).toHaveBeenCalledWith('toggle', emitObject);
            });
        });

        describe('filterEmitObject :: ', () => {
            it('should return an object using the tileId', () => {
                // Arrange
                const wrapper = shallowMount(ImageTile, { tileId: 'chicken' });
                const spy = jest.spyOn(wrapper.vm, 'filterEmitObject');
                const emitObject = { tileId: wrapper.vm.tileId };

                // Act
                wrapper.vm.filterEmitObject(wrapper.vm.tileId);

                // Assert
                expect(spy).toReturnWith(emitObject);
            });
        });
    });
});
