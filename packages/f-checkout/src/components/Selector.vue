<template>
    <div>
        <div
            :class="[
                $style['o-selector'],
                (selectedTime ? $style['o-selector--float'] : '')
            ]">
            <label
                for="delivery-time"
                :class="[
                    $style['o-selector-label']

                ]"
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
    position: relative;
    height: 53px;
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
        padding: 0.5rem;
        color: $form-label-colour;
        cursor: pointer;
    }

    .o-selector-input {
        height: 100%;
        width: 100%;
        padding: 0.2rem;
        border: none;
        cursor: pointer;
    }
}

.o-selector--float {
    .o-selector-label {
        @include font-size(body-s);
        top: 15px;
    }

    .o-selector-input {
        padding-top: 20px;
    }
}
</style>
