<template>
    <div>
        <label for="delivery-time">Delivery time</label>
        <select id="delivery-time">
            <option
                value="As soon as possible">
                As soon as possible
            </option>
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
            default: () => []
        }
    }
};
</script>

<style lang="scss" module>
</style>
