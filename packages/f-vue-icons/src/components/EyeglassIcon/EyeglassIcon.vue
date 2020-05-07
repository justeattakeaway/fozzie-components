<template>
    <eyeglass-icon
        :class="['c-icon c-icon--eyeglass', {
            'c-icon--eyeglass--small': isSmall,
            ...iconClasses
        }]" />
</template>

<script>
import EyeglassIcon from '@justeat/f-icons/src/img/icons/tools/eyeglass.svg';
import iconsMixin from '../../mixins/icons.mixin';

export default {
    components: {
        EyeglassIcon
    },

    mixins: [iconsMixin],

    props: {
        isSmall: {
            type: Boolean,
            default: false
        }
    }
};
</script>
