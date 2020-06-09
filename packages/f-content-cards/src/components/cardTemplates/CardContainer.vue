<template>
    <component
        :is="ctaUrl && ctaEnabled ? 'a' : 'div'"
        :href="ctaEnabled && ctaUrl"
        :class="['c-restaurantCard', { 'c-restaurantCard--isolateHeroImage': isAnniversaryCard }]"
        data-test-id="contentCard-link"
        @click="onClickContentCard">
        <div
            :style="{ backgroundImage: 'url(' + image + ')' }"
            class="c-restaurantCard-bgImg" />
        <div class="c-restaurantCard-info">
            <img
                v-if="icon"
                :src="icon"
                class="c-restaurantCard-thumbnail">
            <h3 class="c-restaurantCard-title">
                {{ title }}
            </h3>
            <h4 class="c-restaurantCard-subTitle">
                {{ subtitle }}
            </h4>
            <template v-for="(textItem, textIndex) in descriptionText">
                <p
                    :key="textIndex"
                    :data-test-id="`ContentCard-TextItem-${textIndex}`"
                    class="c-restaurantCard-text">
                    {{ textItem }}
                </p>
            </template>
            <div class="c-restaurantCard-footer">
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
            linkText
        } = this.card;
        const {
            button_1: button,
            icon_1: icon,
            image_1: image,
            order,
            custom_card_type: type,
            voucher_code: voucherCode
        } = extras;
        return {
            cardId,
            ctaUrl,
            ctaText: button || linkText,
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
        showIcon () {
            return this.icon && ['Promotion_Card_2', 'Voucher_Card_1', 'Restaurant_FTC_Offer_Card'].includes(this.type);
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
    mounted () {
        window.dataLayer = window.dataLayer || [];
        // this.onViewContentCard();
    },
    methods: {
        // onViewContentCard () {
        //     const payload = this.createDataObject({
        //         contentAction: 'view'
        //     });
        //
        //     // this.trackContentCardVisibility(payload);
        // },

        // onClickContentCard () {
        //     const payload = this.createDataObject({
        //         contentAction: 'click',
        //         contentDeeplink: this.ctaUrl
        //     });
        //
        //     // this.logCardClick(this.card);
        //     // this.trackContentCardOnClick(payload);
        // },

        createDataObject (args) {
            return {
                canvasName: null,
                contentAction: null,
                contentCTA: this.voucherCode ? 'copy_voucher' : this.ctaText,
                contentCategory: null,
                contentDeeplink: null,
                contentId: this.extractedCardId,
                contentPosition: this.order,
                contentTitle: this.title,
                contentType: 'ContentCard',
                customVoucherCode: this.voucherCode || null,
                variantName: null,
                carousel: this.isCarousel
                    ?
                    {
                        listType: 'offers',
                        componentId: this.containerTitle
                    }
                    : null,
                ...args
            };
        }
    }
};
</script>
