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
        <div>
            <mega-modal
                :is-open="isOpen"
                :is-narrow="isNarrow"
                :is-wide="isWide"
                :is-flush="isFlush"
                :is-full-height="isFullHeight"
                :is-scrollable="isScrollable"
                :is-close-fixed="isCloseFixed"
                :is-positioned-bottom="isPositionedBottom"
                :is-close-rounded="isCloseRounded"
                :is-text-aligned-center="isTextAlignedCenter"
                :has-close-button="hasCloseButton"
                :has-overlay="hasOverlay"
                :close-button-style="closeButtonStyle"
                :is-mode-right-to-left="isModeRightToLeft"
                :close-on-blur="closeOnBlur"
                :close-button-copy="closeButtonCopy"
                :title="titleCopy"
                :titleHtmlTag="titleHtmlTag">

                <p data-test-id="mega-modal-content">
                    Let's find another restaurant to order from.
                </p>
            </mega-modal>

            <div style="position: relative; z-index: 8999;">
                <h1>Some content to test stacking!</h1>
                <p>This content should all be behind the modal.</p>
                <ol>
                    ${'<li>List item with a kinda long name</li>'.repeat(25)}
                </ol>
            </div>

        </div>
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
    isPositionedBottom: false,
    isCloseRounded: false,
    isTextAlignedCenter: false,
    hasCloseButton: true,
    hasOverlay: true,
    closeButtonStyle: 'cross',
    isModeRightToLeft: false,
    closeOnBlur: true,
    closeButtonCopy: 'Close modal',
    titleCopy: 'This place isn’t taking orders',
    titleHtmlTag: 'h3'
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
    isPositionedBottom: {
        control: { type: 'boolean' }
    },
    isCloseRounded: {
        control: { type: 'boolean' }
    },
    hasCloseButton: {
        control: { type: 'boolean' }
    },
    hasOverlay: {
        control: { type: 'boolean' }
    },
    closeButtonStyle: {
        control: { type: 'select' },
        options: ['cross', 'chevron']
    },
    isModeRightToLeft: {
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
    },
    titleHtmlTag: {
        control: { type: 'text' },
        options: ['h1', 'h2', 'h3', 'h4']
    }
};

MegaModalComponent.storyName = 'f-mega-modal';
