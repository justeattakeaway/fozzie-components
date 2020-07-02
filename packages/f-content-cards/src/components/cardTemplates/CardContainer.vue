<template>
    <component
        :is="ctaUrl && ctaEnabled ? 'a' : 'div'"
        :href="ctaEnabled && ctaUrl"
        :class="['c-contentCard', { 'c-contentCard--isolateHeroImage': isAnniversaryCard }]"
        :data-test-id="testId"
        @click="onClickContentCard"
    >
        <div
            :style="{ backgroundImage: `url('${image}')` }"
            :class="[{ 'c-contentCard-bgImg': !!image }]" />
        <div class="c-contentCard-info">
            <img
                v-if="icon"
                :src="icon"
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
                    :data-test-id="testIdForItemWithIndex(textIndex)"
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
const cardDetails = (card, args) => ({
    canvasName: null,
    contentAction: null,
    contentCTA: card.voucherCode ? 'copy_voucher' : card.ctaText,
    contentCategory: null,
    contentDeeplink: null,
    contentId: card.extractedCardId,
    contentPosition: card.order,
    contentTitle: card.title,
    contentType: 'ContentCard',
    customVoucherCode: card.voucherCode || null,
    variantName: null,
    carousel: card.isCarousel
        ?
        {
            listType: 'offers',
            componentId: card.containerTitle
        }
        : null,
    ...args
});

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
        },
        testId: {
            type: String,
            default: null
        }
    },

    data () {
        const {
            id: cardId,
            url: ctaUrl,
            extras = {},
            imageUrl,
            title,
            description: subtitle
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

        extractedCardId () {
            const decoded = atob(this.cardId);
            const start = decoded.indexOf('=');
            const end = decoded.indexOf('&');
            return decoded.slice(start + 1, end);
        },

        isAnniversaryCard () {
            return this.type === 'Anniversary_Card_1';
        }
    },

    inject: [
        'emitCardView',
        'emitCardClick'
    ],

    mounted () {
        this.onViewContentCard();
    },

    methods: {
        onViewContentCard () {
            const details = cardDetails(this, {
                contentAction: 'view'
            });

            this.emitCardView({
                card: this.card,
                details
            });
        },

        onClickContentCard () {
            const details = cardDetails(this, {
                contentAction: 'click',
                contentDeeplink: this.ctaUrl
            });

            this.emitCardClick({
                card: this.card,
                details
            });
        },

        testIdForItemWithIndex (index) {
            return this.testId && `ContentCard-TextItem-${index}`;
        }
    }
};
</script>
