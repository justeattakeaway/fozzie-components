import { withA11y } from '@storybook/addon-a11y';
import MegaModal from '../src/components/MegaModal.vue';

export default {
    title: 'Components/Molecules',
    decorators: [withA11y]
};

export const MegaModalComponent = (args, { argTypes }) => ({
    components: { MegaModal },
    props: Object.keys(argTypes),
    template: `
        <mega-modal
            :is-open="isOpen"
            :is-narrow="isNarrow"
            :is-wide="isWide"
            :is-flush="isFlush"
            :is-full-height="isFullHeight"
            :is-scrollable="isScrollable"
            :is-close-fixed="isCloseFixed"
            :is-close-rounded="isCloseRounded"
            :has-overlay="hasOverlay"
            :has-close-button="hasCloseButton"
            :close-on-blur="closeOnBlur"
            :close-button-copy="closeButtonCopy"
            :title="titleCopy">

            <p data-test-id="mega-modal-content">
                Let's find another restaurant to order from.
            </p>

        </mega-modal>
    `
});

MegaModalComponent.args = {
    isOpen: true,
    isNarrow: false,
    isWide: false,
    isFlush: false,
    isFullHeight: false,
    isScrollable: false,
    isCloseFixed: false,
    isCloseRounded: false,
    hasOverlay: true,
    hasCloseButton: true,
    closeOnBlur: true,
    closeButtonCopy: 'Close modal',
    titleCopy: 'This place isn’t taking orders'
};

MegaModalComponent.argTypes = {
    isOpen: {
        control: { type: 'boolean' }
    },
    isNarrow: {
        control: { type: 'boolean' }
    },
    isWide: {
        control: { type: 'boolean' }
    },
    isFlush: {
        control: { type: 'boolean' }
    },
    isFullHeight: {
        control: { type: 'boolean' }
    },
    isScrollable: {
        control: { type: 'boolean' }
    },
    isCloseFixed: {
        control: { type: 'boolean' }
    },
    isCloseRounded: {
        control: { type: 'boolean' }
    },
    hasOverlay: {
        control: { type: 'boolean' }
    },
    hasCloseButton: {
        control: { type: 'boolean' }
    },
    closeOnBlur: {
        control: { type: 'boolean' }
    },
    closeButtonCopy: {
        control: { type: 'text' }
    },
    titleCopy: {
        control: { type: 'text' }
    }
};

MegaModalComponent.storyName = 'f-mega-modal';
