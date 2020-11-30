// Demo component for testing `f-alert` independently via `vue serve --open src/demo/Index.vue`
// Fonts were added for beter comparison with the designs.

<template>
    <div>
        <meta
            name="viewport"
            content="width=device-width, initial-scale=1">
        <div data-test-id="component-controls">
            <h1>Component Controls</h1>
            <label for='locale'>Locale</label>
            <select name='locale' data-test-id='control-locale' v-model="controls.locale">
                <option value='en-GB'>en-GB</option>
                <option value='en-AU'>en-AU</option>
            </select>
            <br>
            <label for='alert-type'>Alert Type</label>
            <select name='alert-type' data-test-id='control-alertType' v-model="controls.alertType">
                <option value='success'>success</option>
                <option value='warning'>warning</option>
                <option value='danger'>danger</option>
                <option value='info'>info</option>
            </select>
            <br>
            <label for="is-dismissable">Is Dismissable</label>
            <input id="is-dismissable" type="checkbox" data-test-id='control-isDismissable' v-model="controls.isDismissable">
            <br>
            <label for="heading">Heading</label>
            <input id="heading" type="text" data-test-id='control-heading' v-model='controls.heading'> 
        </div>

        <vue-alert
            :locale='controls.locale'
            :type="controls.alertType"
            :is-dismissable="controls.isDismissable"
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
            isDismissable: false,
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
    color: #ffffff;
    font-family: 'Helvetica Neue', sans-serif;
    background-color:#ffa500;
}
</style>
