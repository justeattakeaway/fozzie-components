<template>
    <card-container
        :card="card"
        :cta-enabled="false">
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
            <span :class="$style['c-contentCard-voucher-copy']">{{ copy.copyCodeLabel }}</span>
        </button>
    </card-container>
</template>

<script>
import copyToClipboard from 'copy-to-clipboard';
import CardContainer from './CardContainer.vue';
import { normaliseCardType } from './utils';

export default {
    components: {
        CardContainer
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
            url
        };
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
            this.emitVoucherCodeClick(this.url);
        }
    }
};
</script>

<style lang="scss" module>
    .c-contentCard-voucher {
        display: flex;
        width: 100%;
        font-family: $font-family-base;
        border: solid $color-border;
        border-width: 1px 0 0;
        padding-top: spacing(x1.5);
        margin-top: spacing(x3);
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
</style>
