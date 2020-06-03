<template>
    <restaurant-icon :class="['c-icon c-icon--restaurant', iconClasses]" />
</template>

<script>
import RestaurantIcon from '@justeat/f-icons/src/img/icons/general/restaurant.svg';
import iconsMixin from '../../mixins/icons.mixin';

export default {
    components: {
        RestaurantIcon
    },

    mixins: [iconsMixin]
};
</script>
