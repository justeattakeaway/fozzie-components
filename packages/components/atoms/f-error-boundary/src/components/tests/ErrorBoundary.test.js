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

describe('ErrorBoundary', () => {
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

        describe.each([
            [false, false],
            [false, true],
            [true, false],
            [true, true]
        ])('when `hideOnError` is %s and `hasError` is %s', (
            hideOnError,
            hasError
        ) => {
            it('should return expected slot props', async () => {
                // Arrange
                const computed = {
                    loggerPayload: () => loggerPayload
                };
                const propsData = {
                    tier,
                    hideOnError
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
                expect(wrapper.html()).toMatchSnapshot();
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
