<template>
    <div>
        <div :class="$style['o-selector']">
            <label
                v-if="!selectedTime"
                for="delivery-time"
                :class="$style['o-selector-label']"
                data-test-id="selector-label">
                Delivery time
            </label>
            <select
                id="delivery-time"
                v-model="selectedTime"
                :class="$style['o-selector-input']">
                <option
                    v-for="(time, index) in deliveryTimes"
                    :key="index"
                    :value="time">
                    {{ time }}
                </option>
            </select>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        deliveryTimes: {
            type: Array,
            default: () => ['', 'As soon as possible', 'Today in 5 minutes']
        }
    },

    data () {
        return {
            selectedTime: null
        };
    }
};
</script>

<style lang="scss" module>
$form-label-colour                        : $grey--dark;
$form-input-colour                        : $color-text;
$form-input-bg                            : $white;
$form-input-borderRadius                  : 3px;
$form-input-borderWidth                   : 1px;
$form-input-borderColour                  : $grey--light;
$form-input-borderColour--focus           : $grey--dark;

.o-selector {
    margin: spacing(x2) 0;
    position: relative;
    padding: 0;
    font-family: $font-family-base;
    color: $form-input-colour;
    font-weight: $font-weight-base;
    background-color: $form-input-bg;
    @include font-size(body-l);

    .o-selector-label {
        display: block;
        color: $form-label-colour;
        position: absolute;
        top: 50%;
        left: 0.5rem;
        transform: translateY(-50%);
        cursor: pointer;
    }

    .o-selector-input {
        height: 53px;
        width: 100%;
        padding: 0.5rem;
        border: $form-input-borderWidth solid $form-input-borderColour;
        border-radius: $form-input-borderRadius;
        cursor: pointer;
    }
}
</style>
