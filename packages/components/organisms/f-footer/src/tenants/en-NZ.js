export default {
    locale: 'en-NZ',
    linkLists: {
        customerService: {
            title: 'Customer service',
            links: []
        },
        cuisines: {
            title: 'Cuisines',
            links: [
                {
                    url: '/browse/cuisines/chinese',
                    text: 'Chinese',
                    gtm: 'click_cuisines_chinese'
                },
                {
                    url: '/browse/cuisines/indian',
                    text: 'Indian',
                    gtm: 'click_cuisines_indian'
                },
                {
                    url: '/browse/cuisines/thai',
                    text: 'Thai',
                    gtm: 'click_cuisines_thai'
                },
                {
                    url: '/browse/cuisines/pizza',
                    text: 'Pizza',
                    gtm: 'click_cuisines_pizza'
                },
                {
                    url: '/browse',
                    text: 'View all cuisines',
                    gtm: 'click_cuisines_view_all'
                }
            ]
        },
        locations: {
            title: 'Cities',
            links: [
                {
                    url: '/browse/locations/auckland/',
                    text: 'Auckland',
                    gtm: 'click_cities_auckland'
                },
                {
                    url: '/browse/locations/wellington/',
                    text: 'Wellington',
                    gtm: 'click_cities_wellington'
                },
                {
                    url: '/browse/locations/christchurch/',
                    text: 'Christchurch',
                    gtm: 'click_cities_christchurch'
                },
                {
                    url: '/browse/locations/dunedin/',
                    text: 'Dunedin',
                    gtm: 'click_cities_dunedin'
                },
                {
                    url: '/takeaway/',
                    text: 'View all cities',
                    gtm: 'click_cities_view_all'
                }
            ]
        },
        brands: {
            title: 'Brands',
            links: []
        },
        aboutUs: {
            title: 'About Us',
            links: [
                {
                    url: '/info/about-us',
                    text: 'Get to know us',
                    gtm: 'click_about_get_to_know_us'
                },
                {
                    url: '/info/contact-us',
                    text: 'Contact us',
                    gtm: 'click_about_contact_us'
                },
                {
                    url: '/help',
                    text: 'Help Centre',
                    gtm: 'click_about_help'
                },
                {
                    url: '/blog',
                    text: 'Menulog Blog',
                    gtm: 'click_about_blog'
                },
                {
                    url: '/info/privacy-policy',
                    text: 'Privacy Policy / Terms & Conditions',
                    gtm: 'click_about_privacy_policy'
                },
                {
                    url: 'https://partner.menulog.co.nz/',
                    text: 'Manage Restaurant',
                    gtm: 'click_about_manage_restaurant'
                },
                {
                    url: '/join_takeaway_section',
                    text: 'List your Restaurant',
                    gtm: 'click_about_list_your_restaurant'
                },
                {
                    url: 'https://secure.ethicspoint.eu/domain/media/en/gui/106834/index.html',
                    text: 'Ethics hotline',
                    target: '_blank'
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
            url: '/blog',
            name: 'rss',
            alt: 'Blog',
            gtm: 'click_service_blog'
        },
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
