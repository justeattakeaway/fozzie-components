// Demo component for testing `f-alert` independently via `vue serve --open src/demo/Index.vue`
// Fonts were added for beter comparison with the designs.

<template>
    <div>
        <meta
            name="viewport"
            content="width=device-width, initial-scale=1">
        <div data-test-id="component-controls">
            <h1>Component Controls</h1>
            <label for="locale">Locale</label>
            <select
                v-model="controls.locale"
                name="locale"
                data-test-id="control-locale">
                <option value="en-GB">
                    en-GB
                </option>
                <option value="en-AU">
                    en-AU
                </option>
            </select>
            <br>
            <label for="alert-type">Alert Type</label>
            <select
                v-model="controls.alertType"
                name="alert-type"
                data-test-id="control-alertType">
                <option value="success">
                    success
                </option>
                <option value="warning">
                    warning
                </option>
                <option value="danger">
                    danger
                </option>
                <option value="info">
                    info
                </option>
            </select>
            <br>
            <label for="is-dismissible">Is Dismissible</label>
            <input
                id="is-dismissible"
                v-model="controls.isDismissible"
                type="checkbox"
                data-test-id="control-isDismissible">
            <br>
            <label for="heading">Heading</label>
            <input
                id="heading"
                v-model="controls.heading"
                type="text"
                data-test-id="control-heading">
        </div>
        <vue-alert
            :locale="controls.locale"
            :type="controls.alertType"
            :is-dismissible="controls.isDismissible"
            :heading="controls.heading">
            You can put any HTML here!
        </vue-alert>
    </div>
</template>

<script>
import VueAlert from '@/components/Alert.vue';

export default {
    components: { VueAlert },
    data: () => ({
        controls: {
            locale: 'en-GB',
            alertType: 'success',
            isDismissible: true,
            heading: 'Title of the alert'
        }
    })
};
</script>

<style>
body {
    margin: 0;
}

.component-controls {
    color: #fff;
    font-family: 'Helvetica Neue', sans-serif;
    background-color: #ffa500;
}
</style>
