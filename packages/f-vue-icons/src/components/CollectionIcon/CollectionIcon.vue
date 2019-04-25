<template>
    <component
        :is="iconComponent"
        :class="['c-icon', iconClass, iconClasses]" />
</template>

<script>
import CollectionIcon from '@justeat/f-icons/src/img/icons/general/collection.svg';
import CollectionBagIcon from '@justeat/f-icons/src/img/icons/general/collectionBag.svg';
import iconsMixin from '../../mixins/icons.mixin';

export default {
    components: {
        CollectionIcon,
        CollectionBagIcon
    },

    mixins: [iconsMixin],

    props: {
        isBag: {
            type: Boolean,
            default: false
        }
    },

    computed: {
        iconComponent () {
            return this.isBag ? 'collection-bag-icon' : 'collection-icon';
        },

        iconClass () {
            return this.isBag ? 'c-icon--collectionBag' : 'c-icon--collection';
        }
    }
};
</script>
