import createFeatureManagementInstance from '@justeat/feature-management';
import featuresModule from '../store/features.module';

const namespace = 'f-feature-management';
const storeAction = `${namespace}/update`;
const loggingTags = 'feature-management';

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

function createSettings (store, serviceStore, cookies, analytics, log) {
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

    if (log) {
        settings.log = log;
    }

    const initialConfigAsJson = serviceStore && serviceStore.configJson;
    if (initialConfigAsJson && initialConfigAsJson.features) {
        log.info('[FeaturesService] Initialising with stored config', loggingTags);
        settings.initialConfigAsJson = initialConfigAsJson;
    }

    return settings;
}

/**
 * Vue-friendly service for configuring and providing a Feature Management plugin with its own VueX store
 */
export default class FeaturesService {
    constructor (
        store,
        {
            httpClient,
            cookies,
            analytics,
            log
        }
    ) {
        this.store = store;
        this.log = log;

        store.registerModule(namespace, featuresModule, { preserveState: !!this.serviceStore });

        const settings = createSettings(this.store, this.serviceStore, cookies, analytics, this.log);
        this.featureManagement = createFeatureManagementInstance(settings, httpClient);
    }

    /**
     * Loads the latest features configuration from the CDN
     */
    async update () {
        try {
            const newConfigJson = await this.featureManagement.loadFromCdn();
            await this.store.dispatch(storeAction, newConfigJson);
        } catch (error) {
            this.log.error('Failed to update features config file', error, loggingTags);
        }
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
