<template>
    <alcohol-age-icon :class="['c-icon c-icon--alcoholAge', iconClasses]" />
</template>

<script>
import AlcoholAgeIcon from '@justeat/f-icons/src/img/icons/general/alcoholAge.svg';
import iconsMixin from '../../mixins/icons.mixin';

export default {
    components: {
        AlcoholAgeIcon
    },

    mixins: [iconsMixin]
};
</script>
