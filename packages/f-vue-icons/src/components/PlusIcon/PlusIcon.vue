<template>
    <component
        :is="iconComponent"
        :class="['c-icon c-icon--plus', {
            'c-icon--plus--large': isLarge,
            ...iconClasses
        }]" />
</template>

<script>
import PlusIcon from '@justeat/f-icons/src/img/icons/operators/plus.svg';
import PlusThinIcon from '@justeat/f-icons/src/img/icons/operators/plus--thin.svg';
import iconsMixin from '../../mixins/icons.mixin';

export default {
    components: {
        PlusIcon,
        PlusThinIcon
    },

    mixins: [iconsMixin],

    props: {
        isLarge: {
            type: Boolean,
            default: false
        },

        isThin: {
            type: Boolean,
            default: true
        }
    },

    computed: {
        iconComponent () {
            return this.isThin ? 'plus-thin-icon' : 'plus-icon';
        }
    }
};
</script>
