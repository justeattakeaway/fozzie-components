<template>
    <component
        :is="ctaUrl && ctaEnabled ? 'a' : 'div'"
        :href="ctaEnabled && ctaUrl"
        :class="['c-contentCard', { 'c-contentCard--isolateHeroImage': isAnniversaryCard }]"
        data-test-id="contentCard-link"
    >
        <div
            v-lazy:background-image="image"
            :class="[{ 'c-contentCard-bgImg': !!image }]" />
        <div class="c-contentCard-info">
            <img
                v-if="icon"
                v-lazy="icon"
                class="c-contentCard-thumbnail">
            <h3 class="c-contentCard-title">
                {{ title }}
            </h3>
            <h4 class="c-contentCard-subTitle">
                {{ subtitle }}
            </h4>
            <template v-for="(textItem, textIndex) in descriptionText">
                <p
                    :key="textIndex"
                    :data-test-id="`ContentCard-TextItem-${textIndex}`"
                    class="c-contentCard-text">
                    {{ textItem }}
                </p>
            </template>
            <div class="c-contentCard-footer">
                <slot />
            </div>
        </div>
    </component>
</template>

<script>
export default {
    props: {
        card: {
            type: Object,
            default: () => ({})
        },
        containerTitle: {
            type: String,
            default: ''
        },
        isCarousel: {
            type: Boolean,
            default: false
        },
        ctaEnabled: {
            type: Boolean,
            default: true
        }
    },
    data () {
        const {
            id: cardId,
            url: ctaUrl,
            extras = {},
            imageUrl,
            title,
            description: subtitle,
        } = this.card;
        const {
            icon_1: icon,
            image_1: image,
            order,
            custom_card_type: type,
            voucher_code: voucherCode
        } = extras;

        return {
            cardId,
            ctaUrl,
            image: image || imageUrl,
            icon,
            title,
            subtitle,
            order,
            voucherCode,
            type,
            extras
        };
    },
    computed: {
        descriptionText () {
            return Object.keys(this.extras)
                        .filter(key => key.indexOf('line_') !== -1)
                        .map(key => this.extras[key]);
        },

        isAnniversaryCard () {
            return this.type === 'Anniversary_Card_1';
        }
    }
};
</script>
