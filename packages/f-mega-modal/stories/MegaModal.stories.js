import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import MegaModal from '../src/components/MegaModal.vue';

export default {
    title: 'Components/Atoms/f-mega-modal',

    decorators: [
        withKnobs,
        withA11y
    ],

    parameters: {
        abstract: {
            url: 'https://share.goabstract.com/733ca894-a4bb-43e3-a2b1-dd27ff6d00c4'
        }
    }
};

export const MegaModalComponent = () => ({
    components: { MegaModal },

    props: {
        isOpen: {
            default: boolean('Is open', true)
        },

        isNarrow: {
            default: boolean('Is narrow', false)
        },

        isWide: {
            default: boolean('Is wide', false)
        },

        isFlush: {
            default: boolean('Is flush', false)
        },

        isFullHeight: {
            default: boolean('Is full height', false)
        },

        isScrollable: {
            default: boolean('Is scrollable', false)
        },

        isCloseFixed: {
            default: boolean('Is close fixed', false)
        },

        isCloseRounded: {
            default: boolean('Is close rounded', false)
        },

        hasOverlay: {
            default: boolean('has overlay', true)
        },

        hasCloseButton: {
            default: boolean('has close button', true)
        },

        closeOnBlur: {
            default: boolean('Close on blur', true)
        },

        closeButtonCopy: {
            default: text('Close button copy', 'Close modal')
        }
    },

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
            :close-button-copy="closeButtonCopy">
            <h3 class="u-noSpacing">
                This place isn't taking orders
            </h3>

            <p>Let's find another restaurant to order from.</p>

            <a href="/area/ls18-west-yorkshire/chinese/" class="o-btn o-btn--block o-btn--rounded o-btn--primary">
                More restaurants nearby
            </a>

            <button type="button" class="o-btn o-btn--block o-btn--rounded o-btn--tertiary">
                I'm just browsing
            </button>
        </mega-modal>
    `
});

MegaModalComponent.storyName = 'Example';
