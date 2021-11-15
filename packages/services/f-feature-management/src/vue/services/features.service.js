import createFeatureManagementInstance from '../../lib/createFeatureManagementInstance';
import featuresModule from '../store/features.module';

const namespace = 'f-feature-management';
const storeAction = `${namespace}/update`;

function trackExperiment (key, variant, analytics) {
    analytics.pushEvent({
        event: 'trackExperimentV3',
        experiment: {
            key,
            variant,
            platform: 'feature_management',
            version: 1,
            deviceTimestamp: new Date().toISOString()
        }
    });
}

function contextGetter (store, cookies) {
    return {
        anonUserId: cookies.get('je-auser') || null,
        country: store.state.globalisation.tenant
    };
}

function createSettings (store, serviceStore, cookies, analytics, logger) {
    const { featureManagement: envConfig } = store.state.configuration.settings;

    const settings = {
        keyPrefix: envConfig.scope,
        cdn: {
            host: envConfig.host,
            scope: envConfig.scope,
            environment: envConfig.environment,
            key: envConfig.obfuscationKey,
            poll: (envConfig.pollInterval > 0),
            pollInterval: envConfig.pollInterval
        },
        contextGetter: () => contextGetter(store, cookies),
        onTrack: (key, variant) => trackExperiment(key, variant, analytics)
    };

    if (logger) {
        settings.logger = logger;
    }

    const initialConfigAsJson = serviceStore && serviceStore.configJson;
    if (initialConfigAsJson && initialConfigAsJson.features) {
        logger.logInfo('[FeaturesService] Initialising with stored config');
        settings.initialConfigAsJson = initialConfigAsJson;
    }

    return settings;
}

function createLoggerWrapper (store, logger) {
    const tags = ['feature-management'];
    return {
        logInfo: message => logger?.logInfo(message, store, { tags }),
        logWarn: message => logger?.logWarn(message, store, { tags }),
        logError: message => logger?.logError(message, store, { tags })
    };
}

/**
 * Vue-friendly service for configuring and providing a Feature Management plugin with its own VueX store
 */
export default class FeaturesService {
    constructor (store, {
        httpClient, cookies, analytics, logger
    }) {
        this.store = store;

        store.registerModule(namespace, featuresModule, { preserveState: !!this.serviceStore });

        const loggerWrapper = createLoggerWrapper(store, logger);
        const settings = createSettings(this.store, this.serviceStore, cookies, analytics, loggerWrapper);
        this.featureManagement = createFeatureManagementInstance(settings, httpClient);
    }

    /**
     * Loads the latest features configuration from the CDN
     */
    async update () {
        const newConfigJson = await this.featureManagement.loadFromCdn();
        this.store.dispatch(storeAction, newConfigJson);
    }

    /**
     * Returns a feature management instance that can be injected as a nuxt plugin
     */
    get plugin () {
        return this.featureManagement;
    }

    /**
     * Returns a namespaced store for this service
     */
    get serviceStore () {
        return this.store[namespace];
    }
}
