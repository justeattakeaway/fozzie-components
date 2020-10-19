<template>
    <div
        :class="[
            'o-selector',
            { 'o-selector--float': selectedTime }
        ]"
        data-test-id="selector">
        <label
            for="delivery-time"
            class="o-selector-label">
            Delivery time
        </label>
        <select
            id="delivery-time"
            v-model="selectedTime"
            class="o-selector-input">
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

<style lang="scss">
$form-label-colour                        : $grey--dark;
$form-input-colour                        : $color-text;
$form-input-bg                            : $white;
$form-input-borderRadius                  : 3px;
$form-input-borderWidth                   : 1px;
$form-input-borderColour                  : $grey--light;
$form-input-borderColour--focus           : $grey--dark;

.o-selector {
    position: relative;
    height: 60px;
    margin: spacing(x2) 0;
    padding: 0;
    @include font-size(body-l);
    font-family: $font-family-base;
    color: $form-input-colour;
    font-weight: $font-weight-base;
    background-color: $form-input-bg;
    border: $form-input-borderWidth solid $form-input-borderColour;
    border-radius: $form-input-borderRadius;

    .o-selector-label {
        display: block;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        padding: 5px;
        color: $form-label-colour;
        cursor: pointer;
    }

    .o-selector-input {
        height: 100%;
        width: 100%;
        padding: 2px;
        border: none;
        cursor: pointer;
        color: $color-text;
    }
}

.o-selector--float {
    .o-selector-label {
        @include font-size(body-s, false);
        line-height: 1.29;
        top: 15px;
    }

    .o-selector-input {
        padding-top: spacing(x3);
    }
}
</style>
