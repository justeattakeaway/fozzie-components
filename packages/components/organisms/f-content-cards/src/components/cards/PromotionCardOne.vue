<template>
    <content-card-container
        #default="{
            card: {
                title, subtitle, image, icon, ctaText, url
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
        >
            <template #footer>
                <f-button
                    :href="url"
                    isFullWidth
                    type="primary">
                    {{ ctaText }}
                </f-button>
            </template>
        </content-card-body>
    </content-card-container>
</template>

<script>
import FButton from '@justeat/f-button';
import ContentCardContainer from '../templates/ContentCardContainer.vue';
import ContentCardImage from '../templates/ContentCardImage.vue';
import ContentCardBody from '../templates/ContentCardBody.vue';

export default {
    components: {
        ContentCardContainer,
        ContentCardImage,
        ContentCardBody,
        FButton
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
