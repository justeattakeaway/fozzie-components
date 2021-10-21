import isFunction from 'is-function';
import { logger } from './logger';

/**
 * Track experiment participation.
 * @param {object} experiment with tracking information
 */
function trackExperiment (experiment, onTrack) {
    if (!experiment.experimentKey || !experiment.experimentVariant) {
        return;
    }

    const key = experiment.experimentKey;
    const variant = experiment.experimentVariant;

    if (!isFunction(onTrack)) {
        logger.logWarn(`Experiment will not be tracked as no \`onTrack\` callback was provided (key: ${key}, variant: ${variant})`);
        return;
    }

    logger.logInfo(`Tracking experiment - key: ${key}, variant: ${variant}`);
    onTrack(key, variant);
}

export default trackExperiment;
