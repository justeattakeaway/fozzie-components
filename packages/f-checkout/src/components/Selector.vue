<template>
    <div
        data-test-id="form-select"
        :class="[
            $style['o-form-select'],
            (selectedTime ? $style['o-form-select--float'] : '')
        ]">
        <label
            for="time-selection"
            :class="$style['o-form-select-label']">
            {{ orderMethod }} time
        </label>
        <select
            id="time-selection"
            v-model="selectedTime"
            :class="$style['o-form-select-input']"
            data-test-id="fulfillment-time"
            @change="selectionChanged">
            <option
                v-for="(time, index) in times"
                :key="index"
                :value="time.from">
                {{ time.label.text }}
            </option>
        </select>
    </div>
</template>

<script>
export default {
    props: {
        times: {
            type: Array,
            default: () => []
        },

        orderMethod: {
            type: String,
            default: null
        }
    },

    data () {
        return {
            selectedTime: null
        };
    },

    watch: {
        times (newValue) {
            const selected = newValue.find(t => t.selected);
            if (selected) {
                this.selectedTime = selected.from;
            }
        }
    },

    methods: {
        selectionChanged () {
            this.times.forEach(el => { el.selected = false; });
            const newSelected = this.times.find(t => t.from === this.selectedTime);
            if (newSelected) {
                newSelected.selected = true;
            }
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

.o-form-select {
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

    .o-form-select-label {
        display: block;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        padding: spacing();
        color: $form-label-colour;
        cursor: pointer;
    }

    .o-form-select-input {
        height: 100%;
        width: 100%;
        padding: spacing(x0.5);
        border: none;
        cursor: pointer;
        color: $color-text;
    }
}

/**
 * Modifier – .o-form-select--float
 *
 * Moves the select label to sit above chosen option
 */
.o-form-select--float {
    .o-form-select-label {
        @include font-size(body-s);
        top: 15px;
    }

    .o-form-select-input {
        padding-top: spacing(x3);
    }
}
</style>
