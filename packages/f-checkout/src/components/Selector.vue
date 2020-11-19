<template>
    <div
        data-test-id="form-select">
        <label
            for="time-selection">
            {{ orderMethod }} time
        </label>
        <select
            id="time-selection"
            v-model="selectedTime"
            data-test-id="fulfillment-time"
            @change="selectionChanged">
            <option
                v-for="(time, index) in times"
                :key="index"
                :value="time.from">
                {{ time.label.text }}
            </option>
        </select>
        {{ selectedTime }}
        <form-field
            v-model="selectedTime"
            data-test-id="fulfillment-time"
            :label-text="selectorTitle"
            input-type="dropdown"
            :dropdown-options="times"
            @change="selectionChanged" />
        <form-field
            v-model="selectedTime"
            data-test-id="fulfillment-time"
            :label-text="selectorTitle"
            input-type="dropdown"
            :dropdown-options="labels"
            @input="hmm" />
        </select>
    </div>
</template>

<script>
import FormField from '@justeat/f-form-field';
import '@justeat/f-form-field/dist/f-form-field.css';

export default {

    components: { FormField },

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
            selectedTime: null,
            labels: [],
            test: ['asdsa', 'asdasdaasd']
        };
    },

    computed: {
        selectorTitle () {
            let title;
            if (this.orderMethod) {
                title = this.orderMethod.charAt(0).toUpperCase() + this.orderMethod.slice(1);
            }
            return `${title} time`;
        }
    },

    watch: {
        times (newValue) {
            const selected = newValue.find(t => t.selected);
            if (selected) {
                this.selectedTime = selected.from;
            }
        }
    },

    mounted () {
        if (this.labels) {
            this.createLables(this.labels);
        }
    },

    methods: {
        selectionChanged () {
            this.times.forEach(el => { el.selected = false; });
            console.log(this.selectedTime);
            const newSelected = this.times.find(t => t.label.text === this.selectedTime);
            console.log(newSelected);
            if (newSelected) {
                newSelected.selected = true;
            }
        },

        createLables (aaaaa) {
            if (this.times) {
                this.times.forEach(time => {
                    console.log(time.label.text);
                    console.log(`labhels ${this.labels}`);
                    aaaaa.push(time.label.text);
                });
            }
            this.selectedTime = this.times[0].label.text;
            console.log(this.labels);
        },

        hmm (e) {
            console.log(e);
            this.selectedTime = e;
            this.selectionChanged();
        }
    }
};
</script>
