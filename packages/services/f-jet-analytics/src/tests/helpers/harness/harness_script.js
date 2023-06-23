const AnalyticsService = require('@justeat/f-analytics');
const Vue = require('vue');
const Vuex = require('vuex');

Vue.use(Vuex);

const formData = {};

const onFAnalyticsTestHarnessSubmit = () => {
    const namespace = document.getElementById('namespace').value;
    if (namespace) {
        formData.namespace = namespace;
    }

    const options = document.getElementById('options').value;
    if (options) {
        formData.options = JSON.parse(options);
    }

    console.log('The form has been submitted.', { ...formData });
};

const onFAnalyticsPageLoad = () => {
    console.log('The harness.html DOM is fully loaded.');

    const options = {
        featureName: 'test-harness',
        locale: 'en-GB',
        id: 'GTM-TMPX9FN'
    };

    const service = new AnalyticsService(new Vuex.Store(), {}, options);

    console.log(service.getOptions());
    console.log(service.pushPlatformData());
};

const onTestHarnessPageLoad = () => {
    console.log('The index.html DOM is fully loaded.');

    document.getElementById('fAnalyticsForm').addEventListener('submit', () => {
        onFAnalyticsTestHarnessSubmit();
    });
};

document.addEventListener('DOMContentLoaded', () => {
    if (window.location.href.match('index.html') != null) {
        onTestHarnessPageLoad();
    }

    if (window.location.href.match('harness.html') != null) {
        onFAnalyticsPageLoad();
    }
});
