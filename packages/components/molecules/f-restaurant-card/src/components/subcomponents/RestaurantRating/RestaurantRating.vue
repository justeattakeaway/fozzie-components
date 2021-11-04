<template>
    <div class="rating">
        <div :style="'display: inline-block; height: 20px; width: 20px;'">
            <star-empty-icon />
        </div>
        <span :style="'display: inline-block; height: 20px; width: 20px;'">
            <star-filled-icon />
        </span>
        <data value="5.00">5.00</data>/<data value="6">6</data>
        &nbsp;(<data
            v-if="!isOwnRating"
            value="100">100</data>
        <span v-else>You</span>)
    </div>
</template>

<script>
import { StarEmptyIcon, StarFilledIcon } from '@justeat/f-vue-icons';

export default {
    name: 'RestaurantRating',
    components: {
        StarEmptyIcon,
        StarFilledIcon
    },
    props: {
        isOwnRating: {
            type: Boolean,
            default: false
        }
    }
};
</script>

<style lang="scss">

</style>
