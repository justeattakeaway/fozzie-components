<template>
    <div :class="$style['c-restaurantData']">
        <div :class="$style['c-restaurantData-textWrapper']">
            <text-block :class="[$style['c-restaurantData-text']]" />
            <text-block :class="[$style['c-restaurantData-text']]" />
        </div>
        <rating />
    </div>
</template>

<script>
import TextBlock from './Text.vue';
import Rating from './Rating.vue';

export default {
    components: { TextBlock, Rating }
};
</script>

<style lang="scss" module>
@use '@justeat/fozzie/src/scss/fozzie' as f;

.c-restaurantData {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 96%;
    margin: auto;
    padding: f.spacing();
    border-radius: 0 0 f.$radius-rounded-c f.$radius-rounded-c;
}

.c-restaurantData-textWrapper {
    flex: 1;
}

.c-restaurantData-text {
    width: 25%;
    height: f.spacing(c);
}
</style>
