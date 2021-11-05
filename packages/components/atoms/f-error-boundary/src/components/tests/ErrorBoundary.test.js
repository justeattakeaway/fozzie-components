import { shallowMount, createLocalVue } from '@vue/test-utils';
import ErrorBoundary from '../ErrorBoundary.vue';

const localVue = createLocalVue();

const createComponent = ({
    propsData,
    computed,
    scopedSlots
} = {}) => shallowMount(ErrorBoundary, {
    localVue,
    computed,
    propsData,
    scopedSlots
});

describe('ModalDeliveryFeesInfo', () => {
    const error = 'test error';
    const vm = 'test vm';
    const info = 'test info';
    const tier = 'test tier';
    const loggerPayload = 'test payload';

    describe('render', () => {
        const scopedSlots = {
            default: `<div>
                <p>hasError: {{ props.hasError }}</p>
                <p>error: {{ props.error }}</p>
                <p>vm: {{ props.vm }}</p>
                <p>info: {{ props.info }}</p>
                <p>tier: {{ props.tier }}</p>
                <p>loggerPayload: {{ props.loggerPayload }}</p>
            </div>`
        };

        describe('when `hideOnError` is false and `hasError` is false', () => {
            it('should return slot props when values are set', async () => {
                // Arrange
                const hasError = false;
                const computed = {
                    loggerPayload: () => loggerPayload
                };
                const propsData = {
                    tier,
                    hideOnError: false
                };
                const data = {
                    hasError,
                    error,
                    vm,
                    info
                };

                // Act
                const wrapper = createComponent({
                    scopedSlots,
                    computed,
                    propsData
                });

                await wrapper.setData(data);

                // Assert
                expect(wrapper.html()).toContain(`hasError: ${hasError}`);
                expect(wrapper.html()).toContain(`error: ${error}`);
                expect(wrapper.html()).toContain(`vm: ${vm}`);
                expect(wrapper.html()).toContain(`info: ${info}`);
                expect(wrapper.html()).toContain(`tier: ${tier}`);
                expect(wrapper.html()).toContain(`loggerPayload: ${loggerPayload}`);
            });
        });

        describe('when `hideOnError` is true and `hasError` is true', () => {
            it('should return slot props when values are set', async () => {
                // Arrange
                const hasError = true;
                const computed = {
                    loggerPayload: () => loggerPayload
                };
                const propsData = {
                    tier,
                    hideOnError: true
                };
                const data = {
                    hasError,
                    error,
                    vm,
                    info
                };

                // Act
                const wrapper = createComponent({
                    scopedSlots,
                    computed,
                    propsData
                });

                await wrapper.setData(data);

                // Assert
                expect(wrapper.html()).not.toContain(`hasError: ${hasError}`);
                expect(wrapper.html()).not.toContain(`error: ${error}`);
                expect(wrapper.html()).not.toContain(`vm: ${vm}`);
                expect(wrapper.html()).not.toContain(`info: ${info}`);
                expect(wrapper.html()).not.toContain(`tier: ${tier}`);
                expect(wrapper.html()).not.toContain(`loggerPayload: ${loggerPayload}`);
            });
        });
    });

    describe('errorCaptured', () => {
        it('should emit expected payload when error is captured', () => {
            // Arrange
            const computed = {
                loggerPayload: () => loggerPayload
            };
            const propsData = {
                tier
            };

            // Act
            const wrapper = createComponent({
                computed,
                propsData
            });

            wrapper.vm.interceptError(error, vm, info);

            // Assert
            const [[emittedPayload]] = wrapper.emitted('on-error');
            expect(emittedPayload).toEqual({
                error,
                info,
                loggerPayload,
                tier,
                vm
            });
        });
    });
});
