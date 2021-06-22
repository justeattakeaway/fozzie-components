/**
 * Default Performance log Function, pushes metrics to GTM dataLayer
 * @param {String} metricName Metric logged
 * @param {Object} data Metric data
 */
const gtmLogger = (metricName, data) => {
    window.dataLayer = window.dataLayer || [];
    return window.dataLayer.push({
        event: 'trackEvent',
        eventCategory: 'engagement',
        eventAction: 'app_performance',
        eventLabel: metricName,
        eventValue: metricName === 'cls' ? data * 1000 : data,
        nonInteraction: true
    });
};

export default gtmLogger;
