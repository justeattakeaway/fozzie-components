<template>
    <for-you-layout
        :api-key="apiKey"
        :user-id="userId"
        :locale="locale" />
</template>

<script>
import ForYouLayout from './layouts/ForYouLayout.vue';
import ContentCardsMixin from '../mixins/content-cards';

export default {
    name: 'ContentCards',

    components: {
        ForYouLayout
    },

    mixins: [ContentCardsMixin]
};
</script>
