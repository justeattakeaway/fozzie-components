<template>
    <local-legend-icon :class="[iconClasses]" />
</template>

<script>
import LocalLegendIcon from '@justeat/f-icons/src/img/icons/general/localLegend.svg';
import iconsMixin from '../../mixins/icons.mixin';

export default {
    components: {
        LocalLegendIcon
    },

    mixins: [iconsMixin]
};
</script>
