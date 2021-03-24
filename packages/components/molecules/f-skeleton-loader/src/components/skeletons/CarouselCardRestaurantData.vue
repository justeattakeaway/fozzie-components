<template>
    <div class="c-skeleton-loader-restaurantData c-skeleton-loader-bone">
        <sentence />
        <rating />
    </div>
</template>

<script>
import Sentence from './Sentence.vue';
import Rating from './Rating.vue';

export default {
    components: { Sentence, Rating }
};
</script>

<style lang="scss" scoped>
.c-skeleton-loader-restaurantData {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 96%;
    margin: auto;
    padding: spacing();

    .c-skeleton-loader-sentence {
        width: 25%;
    }
    /deep/ .c-skeleton-loader-text {
        width: 70%;
        height: spacing(x1.8);
    }
    /deep/ .c-skeleton-loader-text:nth-child(2) {
        margin-bottom: 0;
    }
}
</style>
