exports.getLanguageForTenant = tenant => {
    const languagesForTenants = {
        au: 'en-AU',
        es: 'es-ES',
        it: 'it-IT',
        nz: 'en-NZ',
        uk: 'en-GB',
        default: 'en-GB'
    };
    return languagesForTenants[tenant] || languagesForTenants.default;
};
