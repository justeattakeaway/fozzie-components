<template>
    <button
        type="button"
        :class="$style['c-contentCard-voucher']"
        :data-test-id="`contentCard-${cardType}`"
        @click="copyVoucherCode">
        <span
            :class="$style['c-contentCard-voucher-code']"
            :data-test-id="`contentCard-${cardType}-code`">
            {{ code }}
        </span>
        <span
            :class="voucherCopyClasses"
            @transitionend="copyCooldownComplete">
            <span
                data-test-id="contentCard-copied-label"
                :class="$style['c-contentCard-voucher-code-cooldown']"
                role="status">
                <transition
                    :leave-to-class="$style['c-contentCard-voucher-copy-cooldownTick-leave-to']"
                    :leave-active-class="$style['c-contentCard-voucher-copy-cooldownTick-leave-active']">
                    <tick-icon
                        v-if="inCooldown"
                        :class="[
                            $style.zeta,
                            $style['c-contentCard-voucher-code-cooldown-tick']
                        ]" />
                </transition>
                {{ voucherCodeCopiedLabel }}
            </span>
            <span data-test-id="contentCard-not-copied-label">{{ voucherCopyCodeLabel }}</span>
        </span>
    </button>
</template>

<script>
import copyToClipboard from 'copy-to-clipboard';
import {
    COPY_STATE_AVAILABLE,
    COPY_STATE_COOLDOWN,
    COPY_STATE_TRANSITIONOUT
} from '../cardTemplates/voucherCard/service.types';

export default {
    name: 'VoucherCode',
    inject: [
        // Locale-specific copy configuration
        'copy',
        // Callback for emitting event when voucher code is clicked
        'emitVoucherCodeClick'
    ],
    props: {
        code: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
        cardType: {
            type: String,
            required: true
        }
    },
    data: () => ({
        copyState: COPY_STATE_AVAILABLE,
        cooldownTimeout: null
    }),
    computed: {
        /**
         * Return the voucher label based on the copy state
         * @returns String
         */
        voucherCopyCodeLabel () {
            switch (this.copyState) {
                case COPY_STATE_AVAILABLE:
                    return this.copy.copyCodeLabel;
                case COPY_STATE_TRANSITIONOUT:
                    return this.copy.codeCopiedLabel;
                default:
                    return '';
            }
        },

        /**
         * Return the voucher copied label based on copy state
         * @returns String
         */
        voucherCodeCopiedLabel () {
            return this.copyState === COPY_STATE_COOLDOWN ? this.copy.codeCopiedLabel : '';
        },

        /**
         * Return the voucher copy classes based on copy state
         * @returns {*[]}
         */
        voucherCopyClasses () {
            return [
                this.$style['c-contentCard-voucher-copy'],
                ...(this.copyState === COPY_STATE_COOLDOWN ? [
                    this.$style['c-contentCard-voucher-copy--copied']
                ] : []),
                ...(this.copyState === COPY_STATE_TRANSITIONOUT ? [
                    this.$style['c-contentCard-voucher-copy--transition-out']
                ] : [])
            ];
        },

        /**
         * Checks to see if the copy state is in cool down
         * @returns {boolean}
         */
        inCooldown () {
            return this.copyState === COPY_STATE_COOLDOWN;
        }
    },
    methods: {
        /**
         * Fires copy to clipboard, if in cool down clears the timeout, sets copy state
         * creates a cool down timeout and emit voucher code click
         */
        copyVoucherCode () {
            copyToClipboard(this.code);

            if (this.copyState === COPY_STATE_COOLDOWN) {
                clearTimeout(this.cooldownTimeout);
            }

            this.copyState = COPY_STATE_COOLDOWN;
            this.cooldownTimeout = setTimeout(() => this.copyCooldownEnded(), 3000);
            this.emitVoucherCodeClick(this.url);
        },

        /**
         * Sets the copy state to transition timeout
         */
        copyCooldownEnded () {
            this.copyState = COPY_STATE_TRANSITIONOUT;
        },

        /**
         * Sets the copy state to state available
         */
        copyCooldownComplete () {
            this.copyState = COPY_STATE_AVAILABLE;
        }
    }
};
</script>

<style lang="scss" module>
.c-contentCard-voucher {
    display: flex;
    width: 100%;
    font-family: $font-family-base;
    border: none;
    cursor: pointer;
    background: transparent;
}

.c-contentCard-voucher-code,
.c-contentCard-voucher-copy {
    @include font-size(body-l);
    font-weight: $font-weight-bold;
    color: $color-content-link;
    width: 50%;
}

.c-contentCard-voucher-code {
    text-align: left;
}

.c-contentCard-voucher-copy {
    text-align: right;
}

.c-contentCard-voucher-copy--copied {
    color: $color-content-default;
}

.c-contentCard-voucher-copy--transition-out {
    transition: color 1s;
}

.c-contentCard-voucher-copy-cooldownTick-leave-to {
    opacity: 0;
}

.c-contentCard-voucher-copy-cooldownTick-leave-active {
    transition: opacity 1s;
}

.c-contentCard-voucher-code-cooldown-tick {
    fill: $color-content-default;
    width: spacing(d);
    height: spacing(d);
    padding: 0;
    margin-top: -#{spacing()};
}
</style>
