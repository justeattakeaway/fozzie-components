/* eslint-disable no-unused-vars */
import Perfume from 'perfume.js';

/**
* @overview Vue Plugin logging Real User Metrics
* Will console log when `window.fPerfDebug` is set to true
* Builds on top of PerfumeJS https://github.com/zizzamia/perfume.js
*
* @module f-perf
*/

let logPerformance;
let debugMode = window.fPerfDebug || false;

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


const fPerf = {
    /**
     * Instantiates RUM Vue Plugin with options
     * @param {Object} Vue instance
     * @param {Object} options optional configuration, metric logging {Function} and debug mode {Boolean}
     */
    install: (Vue, options) => {
        // Set user defined RUM logging function
        if (options && options.logger && typeof options.logger === 'function') {
            logPerformance = options.logger;
        } else {
            // defaults to GTM tracking
            logPerformance = (metricName, data) => {
                window.dataLayer = window.dataLayer || [];
                // eslint-disable-next-line no-console
                if (debugMode) console.log(metricName, data);

                return window.dataLayer.push({
                    event: 'trackEvent',
                    eventCategory: 'engagement',
                    eventAction: 'app_performance',
                    eventLabel: metricName,
                    eventValue: metricName === 'cls' ? data * 1000 : data,
                    nonInteraction: true
                });
            };
        }

        // When `debugMode` is explicitly specified on instantiation
        if (options.debugMode) {
            ({ debugMode } = options);
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
         */
        Vue.prototype.$perfAnnotateStart = entry => {
            perfumeJS.start(`webPerf_${entry}`);
        };

        Vue.prototype.$perfAnnotateEnd = entry => {
            perfumeJS.end(`webPerf_${entry}`);
        };
    }
};

export default fPerf;
