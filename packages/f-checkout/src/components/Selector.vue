<template>
    <div :class="$style['c-selector']">
        <label
            for="delivery-time"
            :class="$style['o-selector-label']">
            Delivery time
        </label>
        <select
            id="delivery-time"
            :class="$style['c-selector-input']">
            <option
                v-for="(time, index) in deliveryTimes"
                :key="index"
                :value="time">
                {{ time }}
            </option>
        </select>
    </div>
</template>

<script>
export default {
    name: 'SelectorComponent',

    props: {
        deliveryTimes: {
            type: Array,
            default: () => ['', 'As soon as possible', 'Today in 5 minutes']
        }
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

.c-selector {
    margin: 30px 0;
    position: relative;
    padding: 0;
    font-family: $font-family-base;
    color: $form-input-colour;
    font-weight: $font-weight-base;
    background-color: $form-input-bg;

    .o-selector-label {
        display: block;
        color: $form-label-colour;
        margin-bottom: spacing();
        position: absolute;
        top: 50%;
        left: 0.5rem;
        transform: translateY(-50%);
        cursor: pointer;
    }

    .c-selector-input {
        height: 2.5rem;
        width: 100%;
        padding: 0.5rem;
        border: $form-input-borderWidth solid $form-input-borderColour;
        border-radius: $form-input-borderRadius;
        cursor: pointer;
    }
}
</style>
