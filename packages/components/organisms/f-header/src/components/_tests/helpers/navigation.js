import asyncUserDetails from '../__mocks__/api.account.details.json';

const desktopWidth = 1200;
const desktopHeight = 1024;
const mobileWidth = 375;
const mobileHeight = 667;

const resizeWindow = (x, y) => {
    window.innerWidth = x;
    window.innerHeight = y;
    window.dispatchEvent(new Event('resize'));
};

const setDesktopViewport = () => resizeWindow(desktopWidth, desktopHeight);
const setMobileViewport = () => resizeWindow(mobileWidth, mobileHeight);

const defaultPropsData = {
    accountLogin: {},
    accountLogout: {},
    navLinks: {
        orderHistory: {
            text: 'Your orders',
            url: '/order-history',
            gtm: 'click_account_your_orders'
        },
        savedCards: {
            text: 'Your saved cards',
            url: '/account/saved-cards',
            gtm: 'click_account_saved_cards'
        }
    },
    openMenuText: 'Open menu',
    deliveryEnquiry: {},
    showDeliveryEnquiry: false,
    isOrderCountSupported: true,
    offersCopy: {},
    showOffersLink: false,
    showHelpLink: false,
    userInfoProp: false,
    headerBackgroundTheme: 'white'
};

const defaultData = {
    userInfo: {
        isAuthenticated: false,
        friendlyName: 'James Fisher',
        email: 'j.fisher@fakemail.com'
    },
    navIsOpen: false,
    localOrderCountExpires: false
};

const mockGet = jest.fn(url => {
    if (url === '/api/account/details') {
        return Promise.resolve({ data: asyncUserDetails });
    } else if (url === '/analytics/ordercount') {
        return Promise.resolve({
            Count: 1,
            UserId: '6342d07e'
            // Properties below are overwritten in tests, but for completeness of an example API response…
            // Created: '2020-05-07T15:24:19.7875501Z'
            // Expires: '2020-05-07T17:24:19.7875501Z'
        });
    }
    return false;
});

export {
    defaultData,
    defaultPropsData,
    mockGet,
    setDesktopViewport,
    setMobileViewport
};
