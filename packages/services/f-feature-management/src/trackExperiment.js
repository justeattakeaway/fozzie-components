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

    if (typeof (onTrack) !== 'function') {
        logger.logWarn(`Experiment will not be tracked as no \`onTrack\` callback was provided (key: ${key}, variant: ${variant})`);
        return;
    }

    logger.logInfo(`Tracking experiment - key: ${key}, variant: ${variant}`);

    try {
        onTrack(key, variant);
    } catch (error) {
        logger.logError('An exception occurred while trying to send an experiment event', error);
    }
}

export default trackExperiment;
