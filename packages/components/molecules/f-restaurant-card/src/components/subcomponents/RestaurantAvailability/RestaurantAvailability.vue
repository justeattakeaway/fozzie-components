<template>
    <div
        :class="[$style['c-restaurantCard-availability']]"
        data-test-id="restaurant-times">
        <icon-text
            v-if="availabilityTranslatedName"
            :text="availabilityTranslatedName"
            :color="iconColor"
            hide-icon-in-tile-view
            data-test-id="restaurant-availability-type"
            :class="[$style['c-restaurantCard-availability-iconText']]">
            <component
                :is="icon"
                v-if="icon"
                aria-hidden="true"
                data-test-id="restaurant-availability-icon" />
        </icon-text>

        <span
            v-if="availabilityMessage"
            data-test-id="restaurant-availability-message"
            :class="[$style['c-restaurantCard-availability-message']]">
            {{ availabilityMessage }}
        </span>
    </div>
</template>

<script>
import { ClockSmallIcon, WalkingSmallIcon } from '@justeat/f-vue-icons';
import isValidAvailabilityType from './propValidators/availabilityType.validator';
import availabilityTypes from './availabilityTypes';
import IconText from '../IconText.vue';

const availabilityTypeIcons = {
    [availabilityTypes.PREORDER]: ClockSmallIcon,
    [availabilityTypes.COLLECTION]: WalkingSmallIcon
};

const iconColors = {
    [availabilityTypes.PREORDER]: 'colorSupportInfo'
};

export default {
    name: 'RestaurantAvailability',
    components: {
        IconText,
        ClockSmallIcon,
        WalkingSmallIcon
    },
    props: {
        // A string representation of pre-defined availability types: PREORDER, COLLECTION
        availabilityType: {
            type: String,
            default: null,
            validator: isValidAvailabilityType
        },
        // The translated version of the availability type for the current tenant i.e. 'Pre-order', 'Preordina'
        availabilityTranslatedName: {
            type: String,
            default: null
        },
        // The accompanying message for the availability type. i.e Opening times, delivering from...
        availabilityMessage: {
            type: String,
            default: null
        }
    },
    computed: {
        icon () {
            return availabilityTypeIcons[this.availabilityType] || null;
        },
        iconColor () {
            return iconColors[this.availabilityType] || null;
        }
    }
};
</script>

<style lang="scss" module>
.c-restaurantCard-availability {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-right: spacing(b);
}

.c-restaurantCard-availability > .c-restaurantCard-availability-iconText + .c-restaurantCard-availability-message:before {
    @include dotSeparator;
}

.c-restaurantCard-availability-iconText,
.c-restaurantCard-availability-message {
    overflow-wrap: break-word;
    @include font-size($font-paragraph-02);
}
</style>
