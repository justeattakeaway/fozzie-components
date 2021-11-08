import tenantConfigs from '../../tenants';

const i18nMocker = (key, mockLocale) => key.split('.').reduce((acc, current) => acc[current], tenantConfigs[mockLocale].messages);

export default i18nMocker;
