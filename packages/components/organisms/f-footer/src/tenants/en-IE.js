export default {
    locale: 'en-IE',
    linkLists: {
        customerService: {
            title: 'Customer Service',
            links: [
                {
                    url: '/account/register/?returnurl=%2F',
                    text: 'Log in',
                    gtm: 'click_service_login'
                },
                {
                    url: '/account/register/?returnurl=%2F',
                    text: 'Sign up',
                    gtm: 'click_service_signup'
                },
                {
                    url: '/blog',
                    text: 'Blog',
                    gtm: 'click_service_blog'
                },
                {
                    url: '/account/info/',
                    text: 'My account',
                    gtm: 'click_service_account'
                },
                {
                    url: '/help',
                    text: 'Help',
                    gtm: 'click_service_help'
                }
            ]
        },
        cuisines: {
            title: 'Cuisines',
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
                    url: '/takeaway/nearme',
                    text: 'View all cuisines',
                    gtm: 'click_cuisine_view_all'
                }
            ]
        },
        locations: {
            title: 'Locations',
            links: [
                {
                    url: '/takeaway/dublin',
                    text: 'Dublin',
                    gtm: 'click_locations_dublin'
                },
                {
                    url: '/takeaway/limerick',
                    text: 'Limerick',
                    gtm: 'click_locations_limerick'
                },
                {
                    url: '/takeaway/cork',
                    text: 'Cork',
                    gtm: 'click_locations_cork'
                },
                {
                    url: '/takeaway/ballymun',
                    text: 'Ballymun',
                    gtm: 'click_locations_ballymun'
                },
                {
                    url: '/takeaway/waterford',
                    text: 'Waterford',
                    gtm: 'click_locations_waterford'
                },
                {
                    url: '/takeaway/',
                    text: 'View all locations',
                    gtm: 'click_locations_view_all'
                }
            ]
        },
        brands: {
            title: 'Brands',
            links: [
                {
                    url: '/takeaway/brands/burger-king',
                    text: 'Burger King',
                    gtm: 'click_brands_burger_king'
                },
                {
                    url: '/takeaway/brands/apache-pizza',
                    text: 'Apache Pizza',
                    gtm: 'click_brands_apache_pizza'
                },
                {
                    url: '/takeaway/brands/kfc',
                    text: 'KFC',
                    gtm: 'click_brands_kfc'
                },
                {
                    url: '/takeaway/brands/supermacs',
                    text: 'Supermacs',
                    gtm: 'click_brands_supermacs'
                },
                {
                    url: '/takeaway/brands/eddie-rockets',
                    text: 'Eddie Rockets',
                    gtm: 'click_brands_eddie_rockets'
                },
                {
                    url: '/takeaway/brands/',
                    text: 'View all brands',
                    gtm: 'click_brands_all'
                }
            ]
        },
        aboutUs: {
            title: 'A bit more about us',
            links: [
                {
                    url: '/info/about-us',
                    text: 'About Just Eat',
                    gtm: 'click_about_about_justeat'
                },
                {
                    url: '/pricepromise',
                    text: 'Price Promise',
                    gtm: 'click_about_price_promise'
                },
                {
                    url: '/info/gift-cards',
                    text: 'Just Eat Giftcards',
                    gtm: 'click_about_giftcards'
                },
                {
                    url: 'https://restaurants.just-eat.ie/signup',
                    text: 'Restaurant sign up',
                    gtm: 'click_about_restaurant_signup'
                },
                {
                    url: 'https://couriers.just-eat.ie/application',
                    text: 'Deliver with Just Eat',
                    gtm: 'click_deliverwithjusteatfooter'
                },
                {
                    url: '/info/privacy-policy',
                    text: 'Privacy Policy',
                    gtm: 'click_about_privacy_policy'
                },
                {
                    url: '/info/terms-and-conditions',
                    text: 'Terms & Conditions',
                    gtm: 'click_about_tandcs'
                },
                {
                    url: '/info/cookies-policy',
                    text: 'Cookie Policy',
                    gtm: 'click_about_cookie_policy'
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
        },
        {
            url: 'https://www.twitter.com/JustEatIE',
            name: 'twitter',
            alt: 'Just Eat on Twitter (leads to external site)',
            gtm: 'click_follow_twitter'
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
