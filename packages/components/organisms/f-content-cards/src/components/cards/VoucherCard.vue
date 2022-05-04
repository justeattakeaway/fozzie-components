<template>
    <content-card-container
        #default="{
            card: {
                title, subtitle, image, icon, description, voucherCode, url
            }
        }"
        :is-clickable="false"
        :card="card">
        <content-card-image
            :restaurant-logo-url="icon"
            :background-image-url="image" />
        <content-card-body
            :title="title"
            :subtitle="subtitle"
            :description="description"
            has-border-footer
        >
            <template #footer>
                <content-card-voucher-code
                    card-type="voucher-card"
                    :code="voucherCode"
                    :url="url" />
            </template>
        </content-card-body>
    </content-card-container>
</template>

<script>
import ContentCardContainer from '../templates/ContentCardContainer.vue';
import ContentCardImage from '../templates/ContentCardImage.vue';
import ContentCardBody from '../templates/ContentCardBody.vue';
import ContentCardVoucherCode from '../templates/ContentCardVoucherCode.vue';

export default {
    components: {
        ContentCardContainer,
        ContentCardImage,
        ContentCardBody,
        ContentCardVoucherCode
    },
    props: {
        card: {
            type: Object,
            default: () => ({})
        }
    }
};
</script>

<style scoped>

</style>
