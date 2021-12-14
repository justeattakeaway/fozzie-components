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

        describe('tileId :: ', () => {
            it('should apply `tileId` to the input id', () => {
                // Arrange
                const propsData = { tileId: 'chicken' };

                // Act
                const wrapper = shallowMount(ImageTile, {
                    propsData
                });

                const input = wrapper.find('[data-test-id="image-tile-input"]');

                // Assert
                expect(input.attributes('id')).toContain(propsData.tileId);
            });

            it('should apply `tileId` to the label for', () => {
                // Arrange
                const propsData = { tileId: 'chicken' };

                // Act
                const wrapper = shallowMount(ImageTile, {
                    propsData
                });

                const label = wrapper.find('[data-test-id="image-tile-label"]');

                // Assert
                expect(label.attributes('for')).toContain(propsData.tileId);
            });

            describe('imgSrc :: ', () => {
                it('should apply `tileId` to the label for', () => {
                    // Arrange
                    const propsData = { imgSrc: 'https://via.placeholder.com/150' };

                    // Act
                    const wrapper = shallowMount(ImageTile, {
                        propsData
                    });

                    const image = wrapper.find('[data-test-id="image-tile-image"]');

                    // Assert
                    expect(image.attributes('src')).toContain(propsData.imgSrc);
                });
            });

            describe('isSelected :: ', () => {
                it('should make `isFilterSelected` true when set to true', () => {
                    // Arrange
                    const propsData = { isSelected: true };

                    // Act
                    const wrapper = shallowMount(ImageTile, {
                        propsData
                    });

                    // Assert
                    expect(wrapper.vm.isFilterSelected).toBe(true);
                });

                it('should make `isFilterSelected` false when set to false', () => {
                    // Arrange
                    const propsData = { isSelected: false };

                    // Act
                    const wrapper = shallowMount(ImageTile, {
                        propsData
                    });

                    // Assert
                    expect(wrapper.vm.isFilterSelected).toBe(false);
                });
            });
        });
    });

    describe('watch:: ', () => {
        describe('isSelected:: ', () => {
            it('should update `isFilterSelected` when changed', async () => {
                // Arrange
                const wrapper = shallowMount(ImageTile, { isFilterSelected: false, isSelected: false });

                // Act
                await wrapper.vm.$options.watch.isSelected.call(wrapper.vm, true);

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
