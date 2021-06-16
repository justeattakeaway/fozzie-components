/* eslint-disable no-unused-vars */
import Perfume from 'perfume.js';

/**
* @overview Vue Plugin logging Real User Metrics
* Will console log when `window.fPerfDebug` is set to true
* Builds on top of PerfumeJS https://github.com/zizzamia/perfume.js
*
* @module f-perf
*/

let performanceLog;
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
                    performanceLog('navigationTiming', data);
                }
                break;
            case 'networkInformation':
                if (data && data.effectiveType) {
                    performanceLog('networkInformation', data);
                }
                break;
            case 'storageEstimate':
                performanceLog('storageEstimate', data);
                break;
            case 'ttfb':
                performanceLog('ttfb', { duration: data });
                break;
            case 'fp':
                performanceLog('firstPaint', { duration: data });
                break;
            case 'fcp':
                performanceLog('firstContentfulPaint', { duration: data });
                break;
            case 'fid':
                performanceLog('firstInputDelay', { duration: data });
                break;
            case 'lcp':
                performanceLog('largestContentfulPaint', { duration: data });
                break;
            case 'lcpFinal':
                performanceLog('largestContentfulPaintFinal', {
                    duration: data
                });
                break;
            case 'cls':
                performanceLog('cumulativeLayoutShift', { value: data });
                break;
            case 'clsFinal':
                performanceLog('cumulativeLayoutShiftFinal', { value: data });
                break;
            case 'tbt':
                performanceLog('totalBlockingTime', { duration: data });
                break;
            case 'elPageTitle':
                performanceLog('elementTimingPageTitle', { duration: data });
                break;
            default:
                performanceLog(`${metricName}`, { duration: data });
                break;
        }
    }
});


const webPerf = {
    /**
     * Instantiates RUM Vue Plugin with options
     * @param {Object} Vue instance
     * @param {Object} options optional configuration, metric logging {Function} and debug mode {Boolean}
     */
    install: (Vue, options) => {
        // Set user defined RUM logging function
        if (options && options.log && typeof options.log === 'function') {
            performanceLog = options.log;
        } else {
            // defaults to GTM tracking
            performanceLog = (metricName, data) => {
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

export default webPerf;
