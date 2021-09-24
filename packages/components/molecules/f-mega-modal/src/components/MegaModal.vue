<template>
    <div
        ref="megaModal"
        :class="['c-megaModal',
                 $style['c-megaModal'],
                 { 'u-overlay': showOverlay }]"
        data-test-id='mega-modal-component'
        :aria-hidden="!isOpen"
        @click.self="overlayClose">
        <div
            ref="megaModalContent"
            :class="['c-megaModal-content', $style['c-megaModal-content'], {
                'c-megaModal-content--visible': isOpen,
                [$style['c-megaModal-content--visible']]: isOpen,
                [$style['c-megaModal-content--narrow']]: isNarrow,
                [$style['c-megaModal-content--wide']]: isWide,
                [$style['c-megaModal-content--flush']]: isFlush,
                [$style['is-fullHeight']]: isFullHeight,
                [$style['is-positioned-bottom']]: isPositionedBottom
            }]"
            role="dialog">
            <div
                ref="megaModalDocument"
                :class="['c-megaModal-document', {
                    'c-megaModal-document--scrollable': isScrollable,
                    [$style['c-megaModal-document--scrollable']]: isScrollable
                }]"
                role="document">
                <slot
                    v-if="hasCloseButton"
                    name="close-button">
                    <f-button
                        is-icon
                        :class="[$style['c-megaModal-closeBtn'], {
                            [$style['c-megaModal-closeBtn--fixed']]: isCloseFixed || isFullHeight
                        }]"
                        button-type="ghostTertiary"
                        button-size="xsmall"
                        data-test-id="close-modal"
                        @click.native="close">
                        <cross-icon
                            :class="[$style['c-megaModal-closeIcon']]" />

                        <span class="is-visuallyHidden">
                            {{ closeButtonCopy }}
                        </span>
                    </f-button>
                </slot>

                <component
                    :is="titleHtmlTag"
                    v-if="title"
                    :class="['c-megaModal-title', $style['c-megaModal-title']]"
                    data-test-id="mega-modal-title">
                    {{ title }}
                </component>

                <slot />
            </div>
        </div>
    </div>
</template>

<script>
import { CrossIcon } from '@justeat/f-vue-icons';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import FButton from '@justeat/f-button';
import '@justeat/f-button/dist/f-button.css';

export default {
    components: {
        CrossIcon,
        FButton
    },
    props: {
        isOpen: {
            type: Boolean,
            default: false
        },

        isNarrow: {
            type: Boolean,
            default: false
        },

        isWide: {
            type: Boolean,
            default: false
        },

        isFlush: {
            type: Boolean,
            default: false
        },

        isFullHeight: {
            type: Boolean,
            default: false
        },

        isScrollable: {
            type: Boolean,
            default: false
        },

        isCloseFixed: {
            type: Boolean,
            default: false
        },

        isPositionedBottom: {
            type: Boolean,
            default: false
        },

        hasOverlay: {
            type: Boolean,
            default: true
        },

        hasCloseButton: {
            type: Boolean,
            default: true
        },

        closeOnBlur: {
            type: Boolean,
            default: true
        },

        closeButtonCopy: {
            type: String,
            default: 'Close modal'
        },

        title: {
            type: String,
            default: ''
        },

        titleHtmlTag: {
            type: String,
            default: 'h3',
            validator: value => ['h1', 'h2', 'h3', 'h4'].includes(value)
        }
    },

    computed: {
        showOverlay () {
            return this.isOpen
                && this.hasOverlay;
        }
    },

    watch: {
        isOpen (newVal) {
            if (newVal) {
                this.open();
            } else {
                this.close({ emit: false });
            }
        }
    },

    beforeDestroy () {
        // In case modal is destroyed without being closed first, re-enable scrolling
        enableBodyScroll(this.$refs.megaModalDocument);
    },

    methods: {
        /**
         * Handles user key presses to help improve acccessibilty for keyboard users.
         *
         * @param {Object} e Event object.
         */
        keyActions (e) {
            if (e.key === 'Escape') {
                this.close();
            }

            if (e.key === 'Tab' && this.firstFocusableEl) {
                const { activeElement } = document;
                const isFirstElement = activeElement === this.firstFocusableEl;
                const isLastElement = activeElement === this.lastFocusableEl;

                if (e.shiftKey && isFirstElement) {
                    // If focused on first item and user presses back-tab, go to the last focusable item
                    this.lastFocusableEl.focus();

                    e.preventDefault();
                } else if (!e.shiftKey && isLastElement) {
                    // If focused on the last item and user presses tab, go to the first focusable item
                    this.firstFocusableEl.focus();

                    e.preventDefault();
                }
            }
        },

        /**
         * Registers modal actions when the modal is opened.
         *
         * Emits an `open` event on completion.
         */
        open () {
            if (this.hasOpened) return;

            this.hasOpened = true;

            // use `nextTick` to give Vue enough time to update the DOM with the modal content
            this.$nextTick(() => {
                const focusableElsSelector = [
                    'a[href]:not([tabindex^="-"]):not([inert])',
                    'area[href]:not([tabindex^="-"]):not([inert])',
                    'input:not([disabled]):not([inert])',
                    'select:not([disabled]):not([inert])',
                    'textarea:not([disabled]):not([inert])',
                    'button:not([disabled]):not([inert])',
                    'iframe:not([tabindex^="-"]):not([inert])',
                    'audio:not([tabindex^="-"]):not([inert])',
                    'video:not([tabindex^="-"]):not([inert])',
                    '[contenteditable]:not([tabindex^="-"]):not([inert])',
                    '[tabindex]:not([tabindex^="-"]):not([inert])'
                ].join();

                const {
                    megaModal,
                    megaModalDocument
                } = this.$refs;

                // Filter any "hidden" elements
                const nodeList = megaModal.querySelectorAll(focusableElsSelector) || [];
                const focusableEls = Array.from(nodeList).filter(el => el.offsetHeight > 0);
                const {
                    0: firstFocusableEl,
                    [focusableEls.length - 1]: lastFocusableEl
                } = focusableEls;

                this.firstFocusableEl = firstFocusableEl;
                this.lastFocusableEl = lastFocusableEl;

                // The element from which the modal was triggered
                this.opener = document.activeElement;

                if (this.firstFocusableEl) {
                    this.firstFocusableEl.focus();
                }

                disableBodyScroll(megaModalDocument);

                megaModal.addEventListener('keydown', this.keyActions);
            });

            this.$emit('open');
        },

        /**
         * Closes the modal when the user clicks the overlay if configuration allows.
         */
        overlayClose () {
            if (this.closeOnBlur) {
                this.close();
            }
        },

        /**
         * Unregisters modal actions when the modal is closed.
         *
         * Emits an `close` event on completion.
         *
         * @param {Object} [options] - Close method options.
         * @param {Boolean} [options.emit=true] - Controls whether or not the `close` event be emitted.
         */
        close ({ emit = true } = {}) {
            if (!this.hasOpened) return;

            this.hasOpened = false;

            const {
                megaModal,
                megaModalDocument
            } = this.$refs;

            // Shift the focus back to the element that opened the modal
            if (this.opener) {
                this.opener.focus();
            }

            enableBodyScroll(megaModalDocument);

            megaModal.removeEventListener('keydown', this.keyActions);

            if (emit) {
                this.$emit('close');
            }
        }
    }
};
</script>

<style lang="scss" module>
.c-megaModal {
    z-index: zIndex(high);
}

.c-megaModal-content {
    background-color: $color-container-default;
    border-radius: $radius-rounded-d;
    box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.12);
    display: none;
    padding: spacing(x3);
    position: fixed;
    right: 50%;
    text-align: center;
    top: 50%;
    transform: translate(50%, -50%);
    width: 85%;

    &.is-positioned-bottom {
        border-radius: 0;
        bottom: -100vh;
        box-shadow: 0 -8px 16px 0 rgba(0, 0, 0, 0.22), 0 16px 16px 0 rgba(0, 0, 0, 0.24);
        display: block;
        left: 0;
        top: auto;
        transform: none;
        width: 100%;
        max-width: inherit;

        &.c-megaModal-content--visible {
            bottom: 0;
        }
    }

    @include media('>=narrow') {
        width: 75%;
    }

    @include media('<mid') {
        min-width: em(22);

        &.is-fullHeight {
            height: 100%;
        }
    }

    @include media('>=mid') {
        max-height: 90vh;
        max-width: 600px;
    }
}

    .c-megaModal-content--visible {
        display: block;
    }

    .c-megaModal-content--narrow {
        @include media('>=narrowMid') {
            max-width: 450px;
        }
    }

    .c-megaModal-content--wide {
        max-width: 1080px;

        @include media('<huge') {
            max-width: 75%;
        }

        @include media('<mid') {
            width: 100%;
            max-width: 100%;
        }
    }

    .c-megaModal-content--flush {
        padding: 0;
    }

.c-megaModal-document--scrollable {
    height: 100%;
    max-height: 100vh;
    overflow-x: hidden;
    overflow-y: auto;

    @include media('>=mid') {
        max-height: 550px;
    }

    @include media('height<=narrowMid', '>=mid') {
        max-height: 90vh;
    }
}

.c-megaModal {
    .c-megaModal-closeBtn {
        display: flex;
        opacity: 0.9;
        position: absolute;
        right: spacing(x2);
        top: spacing(x2);
        z-index: zIndex(high);

        @include media('>=mid') {
            position: fixed;
        }
    }

    .c-megaModal-closeBtn--fixed {
        position: fixed;
    }
}

.c-megaModal-title {
    margin: 0 spacing(x3);
}
</style>
