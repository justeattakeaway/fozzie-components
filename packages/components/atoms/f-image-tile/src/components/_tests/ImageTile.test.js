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
                it('should apply `imgSrc` to the image src', () => {
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

                it('should not have an image if the `imgSrc` is empty', () => {
                    // Arrange
                    const propsData = { imgSrc: '' };

                    // Act
                    const wrapper = shallowMount(ImageTile, {
                        propsData
                    });

                    const image = wrapper.find('[data-test-id="image-tile-image"]');

                    // Assert
                    expect(image.exists()).toBe(false);
                });
            });

            describe('isSelected :: ', () => {
                const isSelectedTrue = true;
                const isSelectedFalse = false;

                it.each([
                    [true, isSelectedTrue],
                    [false, isSelectedFalse]
                ])('should update `isToggleSelected` %s when set to %s', (expectedValue, isSelected) => {
                    // Arrange
                    const propsData = { isSelected };

                    // Act
                    const wrapper = shallowMount(ImageTile, {
                        propsData
                    });

                    // Assert
                    expect(wrapper.vm.isToggleSelected).toBe(expectedValue);
                });
            });
        });
    });

    describe('computed :: ', () => {
        describe('isPresentationRole :: ', () => {
            it.each([
                [false, 'this is some alt text', undefined],
                [true, '', 'presentation']
            ])('should return %s if alt text is %s', (expected, altText, role) => {
                // Arrange
                const propsData = {
                    altText, imgSrc: 'https://via.placeholder.com/150'
                };

                // Act
                const wrapper = shallowMount(ImageTile, {
                    propsData
                });

                const image = wrapper.find('[data-test-id="image-tile-image"]');

                // Assert
                expect(wrapper.vm.isPresentationRole).toEqual(expected);
                expect(image.attributes('role')).toEqual(role);
            });
        });

        describe('cssVars :: ', () => {
            it('should return fallbackImage as a css variable', () => {
                // Arrange
                const propsData = { fallbackImage: 'https://via.placeholder.com/150' };

                // Act
                const wrapper = shallowMount(ImageTile, {
                    propsData
                });

                const expected = { '--bg-image': 'url("https://via.placeholder.com/150")' };

                // Assert
                expect(wrapper.vm.cssVars).toEqual(expected);
            });
        });
    });

    describe('watch:: ', () => {
        describe('isSelected:: ', () => {
            it('should update `isToggleSelected` when changed', async () => {
                // Arrange
                const wrapper = shallowMount(ImageTile, { isToggleSelected: false, isSelected: false });

                // Act
                await wrapper.vm.$options.watch.isSelected.call(wrapper.vm, true);

                // Assert
                expect(wrapper.vm.isToggleSelected).toBe(true);
            });
        });
    });

    describe('methods :: ', () => {
        describe('toggleFilter :: ', () => {
            it('should update `isToggleSelected` value and $emit toggle event when called', async () => {
                // Arrange
                const wrapper = shallowMount(ImageTile, { isToggleSelected: false, tileId: 'chicken' });
                const spy = jest.spyOn(wrapper.vm, '$emit');
                const emitObject = { tileId: wrapper.vm.tileId };

                // Act
                wrapper.vm.toggleFilter();
                await wrapper.vm.$nextTick();

                // Assert
                expect(wrapper.vm.isToggleSelected).toBe(true);
                expect(spy).toHaveBeenCalledWith('toggle', emitObject);
            });
        });

        describe('createEmitObject :: ', () => {
            it('should return an object using the tileId', () => {
                // Arrange
                const wrapper = shallowMount(ImageTile, { tileId: 'chicken' });
                const spy = jest.spyOn(wrapper.vm, 'createEmitObject');
                const emitObject = { tileId: wrapper.vm.tileId };

                // Act
                wrapper.vm.createEmitObject(wrapper.vm.tileId);

                // Assert
                expect(spy).toReturnWith(emitObject);
            });
        });
    });
});
