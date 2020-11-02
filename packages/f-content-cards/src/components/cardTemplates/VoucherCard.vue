<template>
    <card-container
        :card="card"
        :cta-enabled="false"
        :isolate-hero-image="isAnniversaryCard"
        :embolden-text="isAnniversaryCard">
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
                <span :class="$style['c-contentCard-voucher-code-cooldown']" role="status">
                    <transition
                        :leave-to-class="$style['c-contentCard-voucher-copy-cooldownTick-leave-to']"
                        :leave-active-class="$style['c-contentCard-voucher-copy-cooldownTick-leave-active']">
                        <tick-icon
                            v-if="inCooldown"
                            :class="[
                                $style['zeta'],
                                $style['c-contentCard-voucher-code-cooldown-tick']
                            ]" />
                    </transition>
                    {{ voucherCodeCopiedLabel }}
                </span>
                <span>{{ voucherCopyCodeLabel }}</span>
                <span role="status">{{ voucherCodeCopiedLabel }}
                    <tick-icon
                        v-if="inCooldown"
                        :class="$style['c-contentCard-voucher-code-cooldown-tick']" />
                </span>
            </span>
        </button>
    </card-container>
</template>

<script>
import copyToClipboard from 'copy-to-clipboard';
import { TickIcon } from '@justeat/f-vue-icons';
import CardContainer from './CardContainer.vue';
import { normaliseCardType } from './utils';

const COPY_STATE_AVAILABLE = 'available';
const COPY_STATE_COOLDOWN = 'cooldown';
const COPY_STATE_TRANSITIONOUT = 'transitionout';

export default {
    components: {
        CardContainer,
        TickIcon
    },

    props: {
        card: {
            type: Object,
            default: () => ({})
        }
    },

    data () {
        const { url, voucherCode, type } = this.card;
        return {
            cardType: normaliseCardType(type),
            code: voucherCode,
            copyState: COPY_STATE_AVAILABLE,
            cooldownTimeout: null,
            url
        };
    },

    computed: {
        isAnniversaryCard () {
            return this.cardType === 'anniversaryCard1';
        },

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

        voucherCodeCopiedLabel () {
            return this.copyState === COPY_STATE_COOLDOWN ? this.copy.codeCopiedLabel : '';
        },

        voucherCopyClasses () {
            return [
                this.$style['c-contentCard-voucher-copy'],
                ...(this.copyState === COPY_STATE_COOLDOWN ? [
                    this.$style['c-contentCard-voucher-copy-copied']
                ] : []),
                ...(this.copyState === COPY_STATE_TRANSITIONOUT ? [
                    this.$style['c-contentCard-voucher-copy-transition-out']
                ] : [])
            ];
        },
        inCooldown () {
            return this.copyState === COPY_STATE_COOLDOWN;
        }
    },

    inject: [
        // Locale-specific copy configuration
        'copy',
        // Callback for emitting event when voucher code is clicked
        'emitVoucherCodeClick'
    ],

    methods: {
        copyVoucherCode () {
            copyToClipboard(this.code);

            if (this.copyState === COPY_STATE_COOLDOWN) {
                clearTimeout(this.cooldownTimeout);
            }

            this.copyState = COPY_STATE_COOLDOWN;
            this.cooldownTimeout = setTimeout(() => this.copyCooldownEnded(), 3000);
            this.emitVoucherCodeClick(this.url);
        },

        copyCooldownEnded () {
            this.copyState = COPY_STATE_TRANSITIONOUT;
        },

        copyCooldownComplete () {
            this.copyState = COPY_STATE_AVAILABLE;
        }
    }
};
</script>

<style lang="scss" module>
    @include badge();

    .c-contentCard-voucher {
        display: flex;
        width: 100%;
        font-family: $font-family-base;
        border: solid $color-border;
        border-width: 1px 0 0;
        padding-top: spacing(x2);
        margin-top: spacing(x2);
        cursor: pointer;
        background: transparent;
    }

    .c-contentCard-voucher-code,
    .c-contentCard-voucher-copy {
        @include font-size(16, false);
        width: 50%;
    }

    .c-contentCard-voucher-code {
        font-weight: $font-weight-base;
        color: $grey--mid;
        text-align: left;
    }

    .c-contentCard-voucher-copy {
        font-weight: $font-weight-bold;
        color: $color-link-default;
        text-align: right;
    }

    .c-contentCard-voucher-copy-copied {
        color: $orange--aa;
    }

    .c-contentCard-voucher-copy-transition-out {
        transition: color 1s;
    }

    .c-contentCard-voucher-copy-cooldownTick-leave-to {
        opacity: 0;
    }

    .c-contentCard-voucher-copy-cooldownTick-leave-active {
        transition: opacity 1s;
    }

    .c-contentCard-voucher-code-cooldown-tick {
        // background-color: $color-text--success;
        fill: $orange--aa;
        width: spacing(x2);
        height: spacing(x2);
        padding: 0;
        margin-top: -#{spacing()};
    }
</style>
