/* eslint-disable no-unused-vars */
import Perfume from 'perfume.js';
import gtmLogger from './gtmLogger';
import metrics from './metrics';

/**
* @overview Vue Plugin logging Real User Metrics
* By default will push to `window.dataLayer`
* Custom logger function can be used
* Builds on top of PerfumeJS https://github.com/zizzamia/perfume.js
*
* @module f-performance
*/

const fPerformance = {
    /**
     * Instantiates RUM Vue Plugin with config
     * @param {Object} Vue instance
     * @param {Object} config optional configuration, metrics and logging {Function}
     */
    install: (Vue, config = {}) => {
        // Check for custom metrics
        const logMetrics = { ...metrics, ...config.metrics || {} };

        // Custom `config.logger` function
        let logPerformance = gtmLogger;
        if (config.logger && typeof config.logger === 'function') {
            logPerformance = config.logger;
        }

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
                const logMetric = logMetrics[metricName];

                // Log defined metric only
                if (logMetric) {
                    const logMetricData = (logMetric.formatData && logMetric.formatData(data)) || data;
                    logPerformance(logMetric.name, logMetricData);
                }
            }
        });

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
        Vue.prototype.$performanceAnnotateStart = entry => {
            perfumeJS.start(entry);
        };

        Vue.prototype.$performanceAnnotateEnd = entry => {
            perfumeJS.end(entry);
        };
    }
};

export default fPerformance;
