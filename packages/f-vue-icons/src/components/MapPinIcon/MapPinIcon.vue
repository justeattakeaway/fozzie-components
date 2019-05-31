<template>
    <map-pin-icon :class="['c-icon c-icon--mapPin', iconClasses]" />
</template>

<script>
import MapPinIcon from '@justeat/f-icons/src/img/icons/tools/mapPin.svg';
import iconsMixin from '../../mixins/icons.mixin';

export default {
    components: {
        MapPinIcon
    },

    mixins: [iconsMixin]
};
</script>
