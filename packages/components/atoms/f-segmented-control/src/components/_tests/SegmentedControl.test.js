import { shallowMount } from '@vue/test-utils';
import SegmentedControl from '../SegmentedControl.vue';

describe('SegmentedControl', () => {
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
        const buttons = wrapper.findAll('button');

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
        const buttons = wrapper.findAll('button');

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
        const buttons = wrapper.findAll('button');

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
        const buttons = wrapper.findAll('button');

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
        const buttons = wrapper.findAll('button');

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
        const buttons = wrapper.findAll('button');

        await buttons.at(0).trigger('keydown', { key: 'ArrowRight' });
        await buttons.at(1).trigger('keydown', { key: 'Space' });

        expect(buttons.at(0).attributes('aria-checked')).toBe('false');
        expect(buttons.at(0).attributes('tabindex')).toBe('-1');
        expect(buttons.at(1).attributes('aria-checked')).toBe('true');
        expect(buttons.at(1).attributes('tabindex')).toBe('0');
        expect(buttons.at(2).attributes('aria-checked')).toBe('false');
        expect(buttons.at(2).attributes('tabindex')).toBe('-1');
    });

    it('should update tabindex to 0 when clicking the same button after navigating away with arrow keys', async () => {
        const propsData = {
            screenreaderLabel: 'Test label',
            options: [
                { label: 'Option 1' },
                { label: 'Option 2' },
                { label: 'Option 3' }
            ]
        };
        const wrapper = shallowMount(SegmentedControl, { propsData });
        const buttons = wrapper.findAll('button');

        await buttons.at(0).trigger('click');
        await wrapper.trigger('keydown', { key: 'ArrowRight' });
        await buttons.at(0).trigger('click');

        expect(buttons.at(0).attributes('tabindex')).toBe('0');
        expect(buttons.at(1).attributes('tabindex')).toBe('-1');
        expect(buttons.at(2).attributes('tabindex')).toBe('-1');
    });

    it('should set tabindex to 0 and aria-checked to true for the option with selected property on render', () => {
        const propsData = {
            screenreaderLabel: 'Test label',
            options: [
                { label: 'Option 1' },
                { label: 'Option 2', selected: true },
                { label: 'Option 3' }
            ]
        };
        const wrapper = shallowMount(SegmentedControl, { propsData });

        const buttons = wrapper.findAll('button.segmented-control__option');

        expect(buttons.at(0).attributes('tabindex')).toBe('-1');
        expect(buttons.at(0).attributes('aria-checked')).toBe('false');
        expect(buttons.at(1).attributes('tabindex')).toBe('0');
        expect(buttons.at(1).attributes('aria-checked')).toBe('true');
        expect(buttons.at(2).attributes('tabindex')).toBe('-1');
        expect(buttons.at(2).attributes('aria-checked')).toBe('false');
    });

    it('should correctly set tabindex when navigating away from a default selected option with arrow keys', async () => {
        const propsData = {
            screenreaderLabel: 'Test label',
            options: [
                { label: 'Option 1' },
                { label: 'Option 2', selected: true },
                { label: 'Option 3' }
            ]
        };
        const wrapper = shallowMount(SegmentedControl, { propsData });

        const buttons = wrapper.findAll('button.segmented-control__option');

        await buttons.at(1).trigger('keydown', { key: 'ArrowRight' });

        expect(buttons.at(0).attributes('tabindex')).toBe('-1');
        expect(buttons.at(0).attributes('aria-checked')).toBe('false');
        expect(buttons.at(1).attributes('tabindex')).toBe('-1');
        expect(buttons.at(1).attributes('aria-checked')).toBe('true');
        expect(buttons.at(2).attributes('tabindex')).toBe('0');
        expect(buttons.at(2).attributes('aria-checked')).toBe('false');
    });

    it('should correctly set tabindex and aria-checked when clicking a different option with a default selected option', async () => {
        const propsData = {
            screenreaderLabel: 'Test label',
            options: [
                { label: 'Option 1' },
                { label: 'Option 2', selected: true },
                { label: 'Option 3' }
            ]
        };
        const wrapper = shallowMount(SegmentedControl, { propsData });

        const buttons = wrapper.findAll('button.segmented-control__option');

        await buttons.at(0).trigger('click');

        expect(buttons.at(0).attributes('tabindex')).toBe('0');
        expect(buttons.at(0).attributes('aria-checked')).toBe('true');
        expect(buttons.at(1).attributes('tabindex')).toBe('-1');
        expect(buttons.at(1).attributes('aria-checked')).toBe('false');
        expect(buttons.at(2).attributes('tabindex')).toBe('-1');
        expect(buttons.at(2).attributes('aria-checked')).toBe('false');
    });
});
