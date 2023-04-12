import { shallowMount } from '@vue/test-utils';
import SegmentedControl from '../SegmentedControl.vue';

describe('SegmentedControl', () => {
    const optionSelector = '[data-test-id^="segmented-control-option-"]';

    it('should be defined', () => {
        const propsData = {
            screenreaderLabel: 'Test label',
            options: [
                { label: 'Option 1' },
                { label: 'Option 2' },
                { label: 'Option 3' }
            ]
        };
        const wrapper = shallowMount(SegmentedControl, { propsData });
        expect(wrapper.exists()).toBe(true);
    });

    describe('aria-checked and tabindex', () => {
        it('should set aria-checked and tabindex correctly on initial render', () => {
            const propsData = {
                screenreaderLabel: 'Test label',
                options: [
                    { label: 'Option 1' },
                    { label: 'Option 2' },
                    { label: 'Option 3' }
                ]
            };
            const wrapper = shallowMount(SegmentedControl, { propsData });
            const buttons = wrapper.findAll(optionSelector);

            expect(buttons.at(0).attributes('aria-checked')).toBe('true');
            expect(buttons.at(0).attributes('tabindex')).toBe('0');
            expect(buttons.at(1).attributes('aria-checked')).toBe('false');
            expect(buttons.at(1).attributes('tabindex')).toBe('-1');
            expect(buttons.at(2).attributes('aria-checked')).toBe('false');
            expect(buttons.at(2).attributes('tabindex')).toBe('-1');
        });

        it('should update aria-checked and tabindex when a button is clicked', async () => {
            const propsData = {
                screenreaderLabel: 'Test label',
                options: [
                    { label: 'Option 1' },
                    { label: 'Option 2' },
                    { label: 'Option 3' }
                ]
            };
            const wrapper = shallowMount(SegmentedControl, { propsData });
            const buttons = wrapper.findAll(optionSelector);

            await buttons.at(1).trigger('click');

            expect(buttons.at(0).attributes('aria-checked')).toBe('false');
            expect(buttons.at(0).attributes('tabindex')).toBe('-1');
            expect(buttons.at(1).attributes('aria-checked')).toBe('true');
            expect(buttons.at(1).attributes('tabindex')).toBe('0');
            expect(buttons.at(2).attributes('aria-checked')).toBe('false');
            expect(buttons.at(2).attributes('tabindex')).toBe('-1');
        });

        it('Should update the tabindex but not aria-checked when navigating with keyboard', async () => {
            const propsData = {
                screenreaderLabel: 'Test label',
                options: [
                    { label: 'Option 1' },
                    { label: 'Option 2' },
                    { label: 'Option 3' }
                ]
            };
            const wrapper = shallowMount(SegmentedControl, { propsData });
            const buttons = wrapper.findAll(optionSelector);

            await buttons.at(0).trigger('keydown', { key: 'ArrowRight' });

            expect(buttons.at(0).attributes('aria-checked')).toBe('true');
            expect(buttons.at(0).attributes('tabindex')).toBe('-1');
            expect(buttons.at(1).attributes('aria-checked')).toBe('false');
            expect(buttons.at(1).attributes('tabindex')).toBe('0');
            expect(buttons.at(2).attributes('aria-checked')).toBe('false');
            expect(buttons.at(2).attributes('tabindex')).toBe('-1');
        });

        it('should loop tabindex with keyboard interactions', async () => {
            const propsData = {
                screenreaderLabel: 'Test label',
                options: [
                    { label: 'Option 1' },
                    { label: 'Option 2' },
                    { label: 'Option 3' }
                ]
            };
            const wrapper = shallowMount(SegmentedControl, { propsData });
            const buttons = wrapper.findAll(optionSelector);

            await buttons.at(0).trigger('keydown', { key: 'ArrowLeft' });

            expect(buttons.at(0).attributes('aria-checked')).toBe('true');
            expect(buttons.at(0).attributes('tabindex')).toBe('-1');
            expect(buttons.at(1).attributes('aria-checked')).toBe('false');
            expect(buttons.at(1).attributes('tabindex')).toBe('-1');
            expect(buttons.at(2).attributes('aria-checked')).toBe('false');
            expect(buttons.at(2).attributes('tabindex')).toBe('0');
        });

        it('should select an option with Enter key', async () => {
            const propsData = {
                screenreaderLabel: 'Test label',
                options: [
                    { label: 'Option 1' },
                    { label: 'Option 2' },
                    { label: 'Option 3' }
                ]
            };
            const wrapper = shallowMount(SegmentedControl, { propsData });
            const buttons = wrapper.findAll(optionSelector);

            await buttons.at(0).trigger('keydown', { key: 'ArrowRight' });
            await buttons.at(1).trigger('keydown', { key: 'Enter' });

            expect(buttons.at(0).attributes('aria-checked')).toBe('false');
            expect(buttons.at(0).attributes('tabindex')).toBe('-1');
            expect(buttons.at(1).attributes('aria-checked')).toBe('true');
            expect(buttons.at(1).attributes('tabindex')).toBe('0');
            expect(buttons.at(2).attributes('aria-checked')).toBe('false');
            expect(buttons.at(2).attributes('tabindex')).toBe('-1');
        });

        it('should select an option with Space key', async () => {
            const propsData = {
                screenreaderLabel: 'Test label',
                options: [
                    { label: 'Option 1' },
                    { label: 'Option 2' },
                    { label: 'Option 3' }
                ]
            };
            const wrapper = shallowMount(SegmentedControl, { propsData });
            const buttons = wrapper.findAll(optionSelector);

            await buttons.at(0).trigger('keydown', { key: 'ArrowRight' });
            await buttons.at(1).trigger('keydown', { key: 'Space' });

            expect(buttons.at(0).attributes('aria-checked')).toBe('false');
            expect(buttons.at(0).attributes('tabindex')).toBe('-1');
            expect(buttons.at(1).attributes('aria-checked')).toBe('true');
            expect(buttons.at(1).attributes('tabindex')).toBe('0');
            expect(buttons.at(2).attributes('aria-checked')).toBe('false');
            expect(buttons.at(2).attributes('tabindex')).toBe('-1');
        });

        it('should update tabindex to 0 when clicking the last clicked button after navigating away with arrow keys', async () => {
            const propsData = {
                screenreaderLabel: 'Test label',
                options: [
                    { label: 'Option 1' },
                    { label: 'Option 2' },
                    { label: 'Option 3' }
                ]
            };
            const wrapper = shallowMount(SegmentedControl, { propsData });
            const buttons = wrapper.findAll(optionSelector);

            await buttons.at(0).trigger('click');
            await wrapper.trigger('keydown', { key: 'ArrowRight' });
            await buttons.at(0).trigger('click');

            expect(buttons.at(0).attributes('tabindex')).toBe('0');
            expect(buttons.at(1).attributes('tabindex')).toBe('-1');
            expect(buttons.at(2).attributes('tabindex')).toBe('-1');
        });

        it('should set tabindex to 0 and aria-checked to true for the a default selected option on render', () => {
            const propsData = {
                screenreaderLabel: 'Test label',
                options: [
                    { label: 'Option 1' },
                    { label: 'Option 2', selected: true },
                    { label: 'Option 3' }
                ]
            };
            const wrapper = shallowMount(SegmentedControl, { propsData });

            const buttons = wrapper.findAll(optionSelector);

            expect(buttons.at(0).attributes('tabindex')).toBe('-1');
            expect(buttons.at(0).attributes('aria-checked')).toBe('false');
            expect(buttons.at(1).attributes('tabindex')).toBe('0');
            expect(buttons.at(1).attributes('aria-checked')).toBe('true');
            expect(buttons.at(2).attributes('tabindex')).toBe('-1');
            expect(buttons.at(2).attributes('aria-checked')).toBe('false');
        });

        it('should correctly set tabindex when navigating away from the default selected option with arrow keys', async () => {
            const propsData = {
                screenreaderLabel: 'Test label',
                options: [
                    { label: 'Option 1' },
                    { label: 'Option 2', selected: true },
                    { label: 'Option 3' }
                ]
            };
            const wrapper = shallowMount(SegmentedControl, { propsData });

            const buttons = wrapper.findAll(optionSelector);

            await buttons.at(1).trigger('keydown', { key: 'ArrowRight' });

            expect(buttons.at(0).attributes('tabindex')).toBe('-1');
            expect(buttons.at(0).attributes('aria-checked')).toBe('false');
            expect(buttons.at(1).attributes('tabindex')).toBe('-1');
            expect(buttons.at(1).attributes('aria-checked')).toBe('true');
            expect(buttons.at(2).attributes('tabindex')).toBe('0');
            expect(buttons.at(2).attributes('aria-checked')).toBe('false');
        });

        it('should correctly set tabindex and aria-checked when clicking a different option to the default selected', async () => {
            const propsData = {
                screenreaderLabel: 'Test label',
                options: [
                    { label: 'Option 1' },
                    { label: 'Option 2', selected: true },
                    { label: 'Option 3' }
                ]
            };
            const wrapper = shallowMount(SegmentedControl, { propsData });

            const buttons = wrapper.findAll(optionSelector);

            await buttons.at(0).trigger('click');

            expect(buttons.at(0).attributes('tabindex')).toBe('0');
            expect(buttons.at(0).attributes('aria-checked')).toBe('true');
            expect(buttons.at(1).attributes('tabindex')).toBe('-1');
            expect(buttons.at(1).attributes('aria-checked')).toBe('false');
            expect(buttons.at(2).attributes('tabindex')).toBe('-1');
            expect(buttons.at(2).attributes('aria-checked')).toBe('false');
        });

        it('Should navigate to the previous item when the ArrowUp key is pressed', async () => {
            const propsData = {
                screenreaderLabel: 'Test label',
                options: [
                    { label: 'Option 1' },
                    { label: 'Option 2', selected: true },
                    { label: 'Option 3' }
                ]
            };
            const wrapper = shallowMount(SegmentedControl, { propsData });
            const buttons = wrapper.findAll(optionSelector);

            await buttons.at(0).trigger('keydown', { key: 'ArrowUp' });

            expect(buttons.at(0).attributes('aria-checked')).toBe('false');
            expect(buttons.at(0).attributes('tabindex')).toBe('0');
            expect(buttons.at(1).attributes('aria-checked')).toBe('true');
            expect(buttons.at(1).attributes('tabindex')).toBe('-1');
            expect(buttons.at(2).attributes('aria-checked')).toBe('false');
            expect(buttons.at(2).attributes('tabindex')).toBe('-1');
        });

        it('Should navigate to the previous item when the ArrowLeft key is pressed', async () => {
            const propsData = {
                screenreaderLabel: 'Test label',
                options: [
                    { label: 'Option 1' },
                    { label: 'Option 2', selected: true },
                    { label: 'Option 3' }
                ]
            };
            const wrapper = shallowMount(SegmentedControl, { propsData });
            const buttons = wrapper.findAll(optionSelector);

            await buttons.at(0).trigger('keydown', { key: 'ArrowLeft' });

            expect(buttons.at(0).attributes('aria-checked')).toBe('false');
            expect(buttons.at(0).attributes('tabindex')).toBe('0');
            expect(buttons.at(1).attributes('aria-checked')).toBe('true');
            expect(buttons.at(1).attributes('tabindex')).toBe('-1');
            expect(buttons.at(2).attributes('aria-checked')).toBe('false');
            expect(buttons.at(2).attributes('tabindex')).toBe('-1');
        });

        it('Should navigate to the next item when the ArrowDown key is pressed', async () => {
            const propsData = {
                screenreaderLabel: 'Test label',
                options: [
                    { label: 'Option 1' },
                    { label: 'Option 2' },
                    { label: 'Option 3' }
                ]
            };
            const wrapper = shallowMount(SegmentedControl, { propsData });
            const buttons = wrapper.findAll(optionSelector);

            await buttons.at(0).trigger('keydown', { key: 'ArrowDown' });

            expect(buttons.at(0).attributes('aria-checked')).toBe('true');
            expect(buttons.at(0).attributes('tabindex')).toBe('-1');
            expect(buttons.at(1).attributes('aria-checked')).toBe('false');
            expect(buttons.at(1).attributes('tabindex')).toBe('0');
            expect(buttons.at(2).attributes('aria-checked')).toBe('false');
            expect(buttons.at(2).attributes('tabindex')).toBe('-1');
        });

        it('Should navigate to the next item when the ArrowRight key is pressed', async () => {
            const propsData = {
                screenreaderLabel: 'Test label',
                options: [
                    { label: 'Option 1' },
                    { label: 'Option 2' },
                    { label: 'Option 3' }
                ]
            };
            const wrapper = shallowMount(SegmentedControl, { propsData });
            const buttons = wrapper.findAll(optionSelector);

            await buttons.at(0).trigger('keydown', { key: 'ArrowRight' });

            expect(buttons.at(0).attributes('aria-checked')).toBe('true');
            expect(buttons.at(0).attributes('tabindex')).toBe('-1');
            expect(buttons.at(1).attributes('aria-checked')).toBe('false');
            expect(buttons.at(1).attributes('tabindex')).toBe('0');
            expect(buttons.at(2).attributes('aria-checked')).toBe('false');
            expect(buttons.at(2).attributes('tabindex')).toBe('-1');
        });

        it('Should wrap around when the ArrowUp key is pressed on the first button', async () => {
            const propsData = {
                screenreaderLabel: 'Test label',
                options: [
                    { label: 'Option 1' },
                    { label: 'Option 2' },
                    { label: 'Option 3' }
                ]
            };
            const wrapper = shallowMount(SegmentedControl, { propsData });
            const buttons = wrapper.findAll(optionSelector);

            await buttons.at(0).trigger('keydown', { key: 'ArrowUp' });

            expect(buttons.at(0).attributes('aria-checked')).toBe('true');
            expect(buttons.at(0).attributes('tabindex')).toBe('-1');
            expect(buttons.at(1).attributes('aria-checked')).toBe('false');
            expect(buttons.at(1).attributes('tabindex')).toBe('-1');
            expect(buttons.at(2).attributes('aria-checked')).toBe('false');
            expect(buttons.at(2).attributes('tabindex')).toBe('0');
        });

        it('Should wrap around when the ArrowLeft key is pressed on the first button', async () => {
            const propsData = {
                screenreaderLabel: 'Test label',
                options: [
                    { label: 'Option 1' },
                    { label: 'Option 2' },
                    { label: 'Option 3' }
                ]
            };
            const wrapper = shallowMount(SegmentedControl, { propsData });
            const buttons = wrapper.findAll(optionSelector);

            await buttons.at(0).trigger('keydown', { key: 'ArrowLeft' });

            expect(buttons.at(0).attributes('aria-checked')).toBe('true');
            expect(buttons.at(0).attributes('tabindex')).toBe('-1');
            expect(buttons.at(1).attributes('aria-checked')).toBe('false');
            expect(buttons.at(1).attributes('tabindex')).toBe('-1');
            expect(buttons.at(2).attributes('aria-checked')).toBe('false');
            expect(buttons.at(2).attributes('tabindex')).toBe('0');
        });

        it('Should wrap around when the ArrowDown key is pressed on the last button', async () => {
            const propsData = {
                screenreaderLabel: 'Test label',
                options: [
                    { label: 'Option 1' },
                    { label: 'Option 2' },
                    { label: 'Option 3', selected: true }
                ]
            };
            const wrapper = shallowMount(SegmentedControl, { propsData });
            const buttons = wrapper.findAll(optionSelector);

            await buttons.at(2).trigger('keydown', { key: 'ArrowDown' });

            expect(buttons.at(0).attributes('aria-checked')).toBe('false');
            expect(buttons.at(0).attributes('tabindex')).toBe('0');
            expect(buttons.at(1).attributes('aria-checked')).toBe('false');
            expect(buttons.at(1).attributes('tabindex')).toBe('-1');
            expect(buttons.at(2).attributes('aria-checked')).toBe('true');
            expect(buttons.at(2).attributes('tabindex')).toBe('-1');
        });

        it('Should wrap around when the ArrowRight key is pressed on the last button', async () => {
            const propsData = {
                screenreaderLabel: 'Test label',
                options: [
                    { label: 'Option 1' },
                    { label: 'Option 2' },
                    { label: 'Option 3', selected: true }
                ]
            };
            const wrapper = shallowMount(SegmentedControl, { propsData });
            const buttons = wrapper.findAll(optionSelector);

            await buttons.at(2).trigger('keydown', { key: 'ArrowRight' });

            expect(buttons.at(0).attributes('aria-checked')).toBe('false');
            expect(buttons.at(0).attributes('tabindex')).toBe('0');
            expect(buttons.at(1).attributes('aria-checked')).toBe('false');
            expect(buttons.at(1).attributes('tabindex')).toBe('-1');
            expect(buttons.at(2).attributes('aria-checked')).toBe('true');
            expect(buttons.at(2).attributes('tabindex')).toBe('-1');
        });
    });

    it('should disable an option with disabled set to true', () => {
        const propsData = {
            screenreaderLabel: 'Test label',
            options: [
                { label: 'Option 1' },
                { label: 'Option 2', disabled: true },
                { label: 'Option 3' }
            ]
        };
        const wrapper = shallowMount(SegmentedControl, { propsData });

        const buttons = wrapper.findAll(optionSelector);

        expect(buttons.at(0).attributes('disabled')).toBeUndefined();
        expect(buttons.at(1).attributes('disabled')).toBe('disabled');
        expect(buttons.at(2).attributes('disabled')).toBeUndefined();
    });

    it('should render the correct label inside each button', () => {
        const propsData = {
            screenreaderLabel: 'Test label',
            options: [
                { label: 'Option 1' },
                { label: 'Option 2' },
                { label: 'Option 3' }
            ],
            size: 'small'
        };
        const wrapper = shallowMount(SegmentedControl, { propsData });

        const buttons = wrapper.findAll(optionSelector);

        for (let i = 0; i < propsData.options.length; i++) {
            expect(buttons.at(i).text()).toContain(propsData.options[i].label);
        }
    });

    it('should render the correct number of buttons based on options', () => {
        const propsData = {
            screenreaderLabel: 'Test label',
            options: [
                { label: 'Option 1' },
                { label: 'Option 2' },
                { label: 'Option 3' }
            ],
            size: 'small'
        };
        const wrapper = shallowMount(SegmentedControl, { propsData });
        const buttons = wrapper.findAll(optionSelector);
        expect(buttons.length).toBe(propsData.options.length);
    });

    describe('SegmentedControl button click events', () => {
        const propsData = {
            screenreaderLabel: 'Test label',
            options: [
                { label: 'Option 1' },
                { label: 'Option 2' },
                { label: 'Option 3' }
            ],
            size: 'small'
        };

        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(SegmentedControl, { propsData });
        });

        const testButtonClick = async buttonIndex => {
            const button = wrapper.find(`${optionSelector}:nth-child(${buttonIndex + 1})`);
            await button.trigger('click');
            expect(wrapper.emitted().input[0]).toEqual([propsData.options[buttonIndex].label]);
        };

        it('should emit input event with correct label when button 1 is clicked', async () => {
            await testButtonClick(0);
        });

        it('should emit input event with correct label when button 2 is clicked', async () => {
            await testButtonClick(1);
        });

        it('should emit input event with correct label when button 3 is clicked', async () => {
            await testButtonClick(2);
        });
    });
});
