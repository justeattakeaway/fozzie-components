export default {
    locale: 'en-IE',
    linkLists: {
        customerService: {
            title: 'Customer service',
            links: [
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
                    url: '/blog',
                    text: 'Blog',
                    gtm: 'click_service_blog'
                },
                {
                    url: '/account/',
                    text: 'My account',
                    gtm: 'click_service_account'
                },
                {
                    url: '/help/',
                    text: 'Help',
                    gtm: 'click_service_help'
                }
            ]
        },
        cuisines: {
            title: 'Popular cuisines',
            links: [
                {
                    url: '/takeaway/nearme/pizza',
                    text: 'Order Pizza',
                    gtm: 'click_cuisine_pizza'
                },
                {
                    url: '/takeaway/nearme/chinese',
                    text: 'Order Chinese',
                    gtm: 'click_cuisine_chinese'
                },
                {
                    url: '/takeaway/nearme/indian',
                    text: 'Order Indian',
                    gtm: 'click_cuisine_indian'
                },
                {
                    url: '/takeaway/nearme/mexican',
                    text: 'Order Mexican',
                    gtm: 'click_cuisine_mexican'
                },
                {
                    url: '/takeaway/nearme/thai',
                    text: 'Order Thai',
                    gtm: 'click_cuisine_thai'
                },
                {
                    url: '/takeaway/nearme/',
                    text: 'View all cuisines',
                    gtm: 'click_cuisine_view_all'
                }
            ]
        },
        locations: {
            title: 'Popular locations',
            links: [
                {
                    url: '/takeaway/dublin-area',
                    text: 'Dublin',
                    gtm: 'click_location_dublin'
                },
                {
                    url: '/takeaway/limerick-city-centre',
                    text: 'Limerick',
                    gtm: 'click_location_limerick'
                },
                {
                    url: '/takeaway/cork-city-centre',
                    text: 'Cork',
                    gtm: 'click_location_cork'
                },
                {
                    url: '/takeaway/galway-city-centre',
                    text: 'Galway',
                    gtm: 'click_location_galway'
                },
                {
                    url: '/takeaway/waterford',
                    text: 'Waterford',
                    gtm: 'click_location_waterford'
                },
                {
                    url: '/takeaway/',
                    text: 'View all locations',
                    gtm: 'click_location_view_all'
                }
            ]
        },
        brands: {
            title: 'Brands',
            links: []
        },
        aboutUs: {
            title: 'About us',
            links: [
                {
                    url: '/info/about-us',
                    text: 'About us',
                    gtm: 'click_about_about_us'
                },
                {
                    url: '/pricepromise',
                    text: 'Price Promise',
                    gtm: 'click_about_price_promise'
                },
                {
                    url: '/gift-vouchers/',
                    text: 'Just Eat Giftcards',
                    gtm: 'click_about_gift_cards'
                },
                {
                    url: '/privacy-policy',
                    text: 'Privacy Policy',
                    gtm: 'click_about_privacy_policy'
                },
                {
                    url: '/info/terms-and-conditions',
                    text: 'Terms & Conditions',
                    gtm: 'click_about_tandcs'
                },
                {
                    url: '/info/terms-and-conditions',
                    text: 'Cookie Policy',
                    gtm: 'click_about_cookie_policy'
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
                    url: 'https://restaurants.just-eat.ie',
                    gtm: 'click_about_restaurant_signup'
                },
                {
                    title: 'Become a courier',
                    url: 'https://couriers.just-eat.ie/application',
                    gtm: 'click_about_couriers'
                }
            ]
        },
        {
            title: 'Already a partner',
            buttons: [
                {
                    title: 'Partner centre',
                    url: 'https://partner.just-eat.ie/',
                    gtm: 'click_about_partner_centre'
                },
                {
                    title: 'Courier portal',
                    url: 'https://couriers.just-eat.ie/application',
                    gtm: 'click_about_courier_portal'
                }
            ]
        }
    ],
    downloadOurApps: 'Download our apps',
    appStoreIcons: [
        {
            url: 'https://app.adjust.com/14v0t5?utm_medium=internal&campaign=footer',
            name: 'ios',
            alt: 'Download on the App Store',
            gtm: 'click_download_ios_app'
        },
        {
            url: 'https://app.adjust.com/rb8vue?utm_medium=internal&campaign=footer',
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
            url: 'https://www.facebook.com/JustEatIreland',
            name: 'facebook',
            alt: 'Just Eat on Facebook (leads to external site)',
            gtm: 'click_follow_facebook'
        },
        {
            url: 'https://www.twitter.com/JustEatIE',
            name: 'twitter',
            alt: 'Just Eat on Twitter (leads to external site)',
            gtm: 'click_follow_twitter'
        },
        {
            url: 'https://instagram.com/justeatie/',
            name: 'instagram',
            alt: 'Just Eat on Instagram (leads to external site)',
            gtm: 'click_follow_instagram'
        },
        {
            url: 'https://www.pinterest.com/justeatie/',
            name: 'pinterest',
            alt: 'Just Eat on Pinterest (leads to external site)',
            gtm: 'click_follow_pinterest'
        }
    ],
    currentCountryName: 'Ireland',
    currentCountryKey: 'ie',
    changeCurrentCountry: 'You are on the Irish website, click here to change.',
    paymentIcons: [
        {
            name: 'mastercard-securecode',
            alt: 'Mastercard Securecode'
        },
        {
            name: 'visa-verified',
            alt: 'Visa Verified'
        }
    ],
    metaLegalField: {}
};
