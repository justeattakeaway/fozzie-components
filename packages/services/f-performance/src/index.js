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
     * @param {Object} config optional configuration, metric logging {Function}
     */
    install: (Vue, config = {}) => {
        let logPerformance = gtmLogger;

        // Use custom `config.logger` function
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
                const metricLog = metrics[metricName] || `${metricName}`;
                const metricLogData = metricLog.formatData(data) || { duration: data };

                logPerformance(metricLog.name, metricLogData);
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
