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
            const isLinkTrue = true;
            const isLinkFalse = false;

            it.each([
                ['https://www.google.com', isLinkTrue],
                ['#', isLinkFalse]
            ])('should update `href` to %s when set to %s', (expectedValue, isLink) => {
                // Arrange
                const propsData = { isLink, href: 'https://www.google.com' };

                // Act
                const wrapper = shallowMount(ImageTile, {
                    propsData
                });

                const link = wrapper.find('[data-test-id="image-tile-link"]');

                // Assert
                expect(link.attributes('href')).toBe(expectedValue);
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
                const isSelectedTrue = true;
                const isSelectedFalse = false;

                it.each([
                    [true, isSelectedTrue],
                    [false, isSelectedFalse]
                ])('should update `isFilterSelected` %s when set to %s', (expectedValue, isSelected) => {
                    // Arrange
                    const propsData = { isSelected };

                    // Act
                    const wrapper = shallowMount(ImageTile, {
                        propsData
                    });

                    // Assert
                    expect(wrapper.vm.isFilterSelected).toBe(expectedValue);
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
