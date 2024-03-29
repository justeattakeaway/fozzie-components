import { shallowMount } from '@vue/test-utils';
import FAlert from '../Alert.vue';

const defaultPropsData = { heading: 'Alert title', type: 'info' };

describe('Alert', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        // Arrange & Act
        const wrapper = shallowMount(FAlert, { propsData: defaultPropsData });

        // Assert
        expect(wrapper.exists()).toBe(true);
    });

    it('should have the alert role for accessibility purposes', () => {
        // Arrange
        const wrapper = shallowMount(FAlert, { propsData: defaultPropsData });

        // Act
        const alert = wrapper.find('[data-test-id="alert-component"]');

        // Assert
        expect(alert.attributes('role')).toBe('alert');
    });

    describe('icon', () => {
        it.each(['danger', 'success', 'info', 'warning'])('should show the %s icon for type %s', type => {
            // Arrange
            const wrapper = shallowMount(FAlert, { propsData: { heading: 'Alert title', type } });

            // Act
            const icon = wrapper.find('[data-test-id="alert-icon"]');

            // Assert
            expect(icon.element.tagName).toMatchSnapshot();
        });
    });

    describe('heading', () => {
        it('should render the heading passed into the alert', () => {
            // Arrange
            const wrapper = shallowMount(FAlert, { propsData: defaultPropsData });

            // Act
            const heading = wrapper.find('[data-test-id="alert-heading"]');

            // Assert
            expect(heading.text()).toBe(defaultPropsData.heading);
        });
    });

    describe('dismiss', () => {
        it('should render the dismiss button if `isDismissible` is true', () => {
            // Arrange
            const wrapper = shallowMount(FAlert, { propsData: { ...defaultPropsData, isDismissible: true } });

            // Act
            const dismiss = wrapper.find('[data-test-id="alert-dismiss"]');

            // Assert
            expect(dismiss.exists()).toBe(true);
        });

        it('should not render the dismiss button if `isDismissible` is false', () => {
            // Arrange
            const wrapper = shallowMount(FAlert, { propsData: { ...defaultPropsData, isDismissible: false } });

            // Act
            const dismiss = wrapper.find('[data-test-id="alert-dismiss"]');

            // Assert
            expect(dismiss.exists()).toBe(false);
        });

        it('should call `dismiss` when clicked', () => {
            // Arrange
            const dismissSpy = jest.spyOn(FAlert.methods, 'dismiss');

            const wrapper = shallowMount(FAlert, {
                propsData: { ...defaultPropsData, isDismissible: true }
            });

            // Act
            wrapper.find('[data-test-id="alert-dismiss"]').trigger('click');

            // Assert
            expect(dismissSpy).toHaveBeenCalled();
        });
    });

    describe('props', () => {
        describe('type', () => {
            it('should be required', () => {
                // Arrange
                const wrapper = shallowMount(FAlert, { propsData: defaultPropsData });

                // Act
                const { type } = wrapper.vm.$options.props;

                // Assert
                expect(type.required).toBe(true);
            });

            it('should only allow `danger`, `success`, `info` or `warning` to be passed in.', () => {
                // Arrange
                const wrapper = shallowMount(FAlert, { propsData: defaultPropsData });

                // Act
                const { type } = wrapper.vm.$options.props;

                // Assert
                expect(type.validator('invalid')).toBeFalsy();
                expect(type.validator('danger')).toBeTruthy();
                expect(type.validator('success')).toBeTruthy();
                expect(type.validator('info')).toBeTruthy();
                expect(type.validator('warning')).toBeTruthy();
            });
        });

        describe('heading', () => {
            it('should be required', () => {
                // Arrange
                const wrapper = shallowMount(FAlert, { propsData: defaultPropsData });

                // Act
                const { heading } = wrapper.vm.$options.props;

                // Assert
                expect(heading.required).toBe(true);
            });
        });
    });

    describe('methods', () => {
        describe('dismiss', () => {
            it('should set `isDismissed` to `true`', () => {
                // Arrange
                const wrapper = shallowMount(FAlert, { propsData: defaultPropsData });

                // Act
                wrapper.vm.dismiss();

                // Assert
                expect(wrapper.vm.isDismissed).toBe(true);
            });
        });
    });

    describe('computed', () => {
        describe('icon', () => {
            it('should return the type with `Icon` camelCased', () => {
                // Arrange
                const wrapper = shallowMount(FAlert, { propsData: defaultPropsData });

                // Act
                const result = wrapper.vm.icon;

                // Assert
                expect(result).toBe('infoIcon');
            });
        });
    });

    describe('ariaLiveAttribute', () => {
        it.each(['success', 'danger'])('should return "polite" when alert type is %p', type => {
            // Arrange
            const propsData = {
                heading: 'Alert title',
                type
            };

            const wrapper = shallowMount(FAlert, {
                propsData
            });

            // Act
            const result = wrapper.vm.ariaLiveAttribute;

            // Assert
            expect(result).toBe('polite');
        });

        it.each(['warning', 'info'])('should return "off" when alert type is %p', type => {
            // Arrange
            const propsData = {
                heading: 'Alert title',
                type
            };

            const wrapper = shallowMount(FAlert, {
                propsData
            });

            // Act
            const result = wrapper.vm.ariaLiveAttribute;

            // Assert
            expect(result).toBe('off');
        });
    });
});
