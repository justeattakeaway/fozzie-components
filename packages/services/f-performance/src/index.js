/* eslint-disable no-unused-vars */
import Perfume from 'perfume.js';

/**
* @overview Vue Plugin logging Real User Metrics
* By default will push to `window.dataLayer`
* Custom logger function can be used
* Builds on top of PerfumeJS https://github.com/zizzamia/perfume.js
*
* @module f-performance
*/

/**
 * Default Performance log Function, pushes metrics to GTM dataLayer
 * @param {String} metricName Metric logged
 * @param {Object} data Metric data
 */
let logPerformance = (metricName, data) => {
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

/**
 * Instantiates PerfumeJS with some of the defaults
 */
const perfumeJS = new Perfume({
    analyticsTracker: options => {
        const {
            metricName,
            data,
            eventProperties,
            navigatorInformation,
            vitalsScore
        } = options;

        switch (metricName) {
            case 'navigationTiming':
                if (data && data.timeToFirstByte) {
                    logPerformance('navigationTiming', data);
                }
                break;
            case 'networkInformation':
                if (data && data.effectiveType) {
                    logPerformance('networkInformation', data);
                }
                break;
            case 'storageEstimate':
                logPerformance('storageEstimate', data);
                break;
            case 'ttfb':
                logPerformance('ttfb', { duration: data });
                break;
            case 'fp':
                logPerformance('firstPaint', { duration: data });
                break;
            case 'fcp':
                logPerformance('firstContentfulPaint', { duration: data });
                break;
            case 'fid':
                logPerformance('firstInputDelay', { duration: data });
                break;
            case 'lcp':
                logPerformance('largestContentfulPaint', { duration: data });
                break;
            case 'lcpFinal':
                logPerformance('largestContentfulPaintFinal', {
                    duration: data
                });
                break;
            case 'cls':
                logPerformance('cumulativeLayoutShift', { value: data });
                break;
            case 'clsFinal':
                logPerformance('cumulativeLayoutShiftFinal', { value: data });
                break;
            case 'tbt':
                logPerformance('totalBlockingTime', { duration: data });
                break;
            case 'elPageTitle':
                logPerformance('elementTimingPageTitle', { duration: data });
                break;
            default:
                logPerformance(`${metricName}`, { duration: data });
                break;
        }
    }
});

const fPerformance = {
    /**
     * Instantiates RUM Vue Plugin with options
     * @param {Object} Vue instance
     * @param {Object} options optional configuration, metric logging {Function} and debug mode {Boolean}
     */
    install: (Vue, options = {}) => {
        // Set user defined RUM logging function
        if (options.logger && typeof options.logger === 'function') {
            logPerformance = options.logger;
        }

        /**
         * Enables tracking annotations of specific method/module in your Vue app
         * see: https://github.com/Zizzamia/perfume.js#annotate-metrics-in-the-devtools
         * e.g.
         * ```
         * this.$perfAnnotateStart('myMethodPerformance');
         * myMethod(400);
         * this.$perfAnnotateEnd('myMethodPerformance');
         * ```
         * Prefixes entry name with `fPerf_` to help filter data
         */
        Vue.prototype.$perfAnnotateStart = entry => {
            perfumeJS.start(`fPerf_${entry}`);
        };

        Vue.prototype.$perfAnnotateEnd = entry => {
            perfumeJS.end(`fPerf_${entry}`);
        };
    }
};

export default fPerformance;
