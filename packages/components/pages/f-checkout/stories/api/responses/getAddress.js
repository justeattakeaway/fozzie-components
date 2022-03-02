import { Addresses } from '../../helpers/addresses';
import { getSuccess, TENANTS } from '../../helpers';

function getAddress (tenant) {
    return {
        ...Addresses[tenant]
    };
}

function buildAddresses () {
    const tenantRequests = [];

    Object.values(TENANTS).forEach(tenant => {
        tenantRequests.push({
            url: `/get-address-${tenant}`,
            ...getSuccess,
            payload: getAddress(tenant)
        });
    });
    return tenantRequests;
}

export default [
    ...buildAddresses()
];
