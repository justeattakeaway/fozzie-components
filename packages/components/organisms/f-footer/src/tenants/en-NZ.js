export default {
    locale: 'en-NZ',
    linkLists: {
        customerService: {
            title: 'Customer service',
            links: [
                {
                    url: '/content/contact-us/',
                    text: 'Contact us',
                    gtm: 'click_service_contact_us'
                },
                {
                    url: '/account/login/',
                    text: 'Log in',
                    gtm: 'click_service_login'
                },
                {
                    url: '/account/register/',
                    text: 'Sign up',
                    gtm: 'click_service_signup'
                },
                {
                    url: '/account/info/',
                    text: 'My account',
                    gtm: 'click_service_account'
                },
                {
                    url: '/blog/',
                    text: 'Menulog Blog',
                    gtm: 'click_service_blog'
                },
                {
                    url: '/help/',
                    text: 'Help Centre',
                    gtm: 'click_service_help'
                }
            ]
        },
        cuisines: {
            title: 'Top cuisines',
            links: [
                {
                    url: '/browse/cuisines/chinese',
                    text: 'Chinese',
                    gtm: 'click_cuisine_chinese'
                },
                {
                    url: '/browse/cuisines/indian',
                    text: 'Indian',
                    gtm: 'click_cuisine_indian'
                },
                {
                    url: '/browse/cuisines/thai',
                    text: 'Thai',
                    gtm: 'click_cuisine_thai'
                },
                {
                    url: '/browse/cuisines/pizza',
                    text: 'Pizza',
                    gtm: 'click_cuisine_pizza'
                },
                {
                    url: '/browse',
                    text: 'View all cuisines',
                    gtm: 'click_cuisine_view_all'
                }
            ]
        },
        locations: {
            title: 'Locations',
            links: [
                {
                    url: '/browse/locations/auckland/',
                    text: 'Auckland',
                    gtm: 'click_location_auckland'
                },
                {
                    url: '/browse/locations/wellington/',
                    text: 'Wellington',
                    gtm: 'click_location_wellington'
                },
                {
                    url: '/browse/locations/christchurch/',
                    text: 'Christchurch',
                    gtm: 'click_location_christchurch'
                },
                {
                    url: '/browse/locations/dunedin/',
                    text: 'Dunedin',
                    gtm: 'click_location_dunedin'
                }
            ]
        },
        brands: {
            title: 'Brands',
            links: []
        },
        aboutUs: {
            title: 'A bit more about us',
            links: [
                {
                    url: '/about_menulog',
                    text: 'Get to know us',
                    gtm: 'click_about_about_menulog'
                },
                {
                    url: '/privacy-policy#privacy_policy',
                    text: 'Privacy Policy / Terms & Conditions',
                    gtm: 'click_about_privacy_policy'
                },
                {
                    url: 'https://connect.menulog.co.nz/',
                    text: 'Partner Centre',
                    gtm: 'click_about_partner_centre'
                },
                {
                    url: '/join_takeaway_section',
                    text: 'Restaurant sign up',
                    gtm: 'click_about_restaurant_signup'
                }
            ]
        }
    },
    linkButtonList: [
        {
            title: 'Partner with Us',
            buttons: [
                {
                    title: 'List your restaurant',
                    url: '/info/join-menulog',
                    gtm: 'click_about_restaurant_signup'
                },
                {
                    title: 'Become a courier',
                    url: 'https://couriers.menulog.co.nz/application/',
                    gtm: 'click_about_couriers'
                }
            ]
        },
        {
            title: 'Already a partner',
            buttons: [
                {
                    title: 'Partner centre',
                    url: 'https://partner.menulog.co.nz/',
                    gtm: 'click_about_partner_centre'
                },
                {
                    title: 'Courier portal',
                    url: 'https://couriers.menulog.co.nz/login',
                    gtm: 'click_about_courier_portal'
                }
            ]
        }
    ],
    downloadOurApps: 'Download our apps',
    appStoreIcons: [
        {
            url: 'https://itunes.apple.com/nz/app/menulog-order-takeaway-food/id485249021?mt=8&&referrer=click%3D69811f6e-2144-4706-bafc-3d9ae07efd62',
            name: 'ios',
            alt: 'Download on the App Store',
            gtm: 'click_download_ios_app'
        },
        {
            url: 'https://play.google.com/store/apps/details?id=nz.co.menulog.m&&referrer=utm_campaign%3DHomepage%252520Banner%26utm_medium%3Dad-analytics%26utm_content%3D1d258717-c68d-439c-b04d-89898e2b73fe%26utm_source%3Dflurry',
            name: 'android',
            alt: 'Get it on Google Play',
            gtm: 'click_download_android_app'
        }
    ],
    feedback: 'Feedback',
    improveOurWebsite: 'Help us improve our website',
    sendFeedback: 'Send feedback',
    followUs: 'Follow us',
    socialIcons: [
        {
            url: 'https://www.facebook.com/Menulog.co.nz',
            name: 'facebook',
            alt: 'Menu Log on Facebook (leads to external site)',
            gtm: 'click_follow_facebook'
        },
        {
            url: 'https://twitter.com/Menulog',
            name: 'twitter',
            alt: 'Menu Log on Twitter (leads to external site)',
            gtm: 'click_follow_twitter'
        },
        {
            url: 'https://www.instagram.com/menulog/',
            name: 'instagram',
            alt: 'Menu Log on Instagram (leads to external site)',
            gtm: 'click_follow_instagram'
        }
    ],
    currentCountryName: 'New Zealand',
    currentCountryKey: 'nz',
    changeCurrentCountry: 'You are on the NZ website, click here to change.',
    paymentIcons: [
        {
            name: 'mastercard',
            alt: 'Mastercard'
        },
        {
            name: 'visa',
            alt: 'Visa'
        },
        {
            name: 'amex',
            alt: 'American Express'
        }
    ],
    metaLegalField: {}
};
