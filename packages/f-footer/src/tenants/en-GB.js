export default {
    locale: 'en-GB',
    linkLists: {
        customerService: {
            title: 'Customer service',
            links: [
                {
                    url: '/contact',
                    text: 'Contact us',
                    gtm: 'click_service_contact_us'
                },
                {
                    url: '/account/login',
                    text: 'Log in',
                    rel: 'nofollow',
                    gtm: 'click_service_login'
                },
                {
                    url: '/account/register',
                    text: 'Sign up',
                    gtm: 'click_service_signup'
                },
                {
                    url: '/blog',
                    text: 'Blog',
                    gtm: 'click_service_blog'
                },
                {
                    url: '/apps',
                    text: 'Mobile apps',
                    gtm: 'click_service_apps'
                },
                {
                    url: '/member/updateuserinfo',
                    text: 'My account',
                    gtm: 'click_service_account'
                }
            ]
        },
        cuisines: {
            title: 'Top cuisines',
            links: [
                {
                    url: '/takeaway/nearme/chinese',
                    text: 'Chinese',
                    gtm: 'click_cuisine_chinese'
                },
                {
                    url: '/takeaway/nearme/indian',
                    text: 'Indian',
                    gtm: 'click_cuisine_indian'
                },
                {
                    url: '/takeaway/nearme/italian',
                    text: 'Italian',
                    gtm: 'click_cuisine_italian'
                },
                {
                    url: '/takeaway/nearme/sushi',
                    text: 'Sushi',
                    gtm: 'click_cuisine_sushi'
                },
                {
                    url: '/takeaway/nearme/pizza',
                    text: 'Pizza',
                    gtm: 'click_cuisine_pizza'
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
                    url: '/takeaway/birmingham',
                    text: 'Birmingham',
                    gtm: 'click_location_birmingham'
                },
                {
                    url: '/takeaway/cardiff',
                    text: 'Cardiff',
                    gtm: 'click_location_cardiff'
                },
                {
                    url: '/takeaway/glasgow',
                    text: 'Glasgow',
                    gtm: 'click_location_glasgow'
                },
                {
                    url: '/takeaway/leeds',
                    text: 'Leeds',
                    gtm: 'click_location_leeds'
                },
                {
                    url: '/takeaway/manchester',
                    text: 'Manchester',
                    gtm: 'click_location_manchester'
                },
                {
                    url: '/takeaway',
                    text: 'View all locations',
                    gtm: 'click_location_view_all'
                }
            ]
        },
        brands: {
            title: 'Brands',
            links: [
                {
                    url: '/takeaway/brands/kfc',
                    text: 'KFC',
                    gtm: 'click_brands_kfc'
                },
                {
                    url: '/takeaway/brands/burger-king',
                    text: 'Burger King',
                    gtm: 'click_brands_burger-king'
                },
                {
                    url: '/takeaway/brands/subway',
                    text: 'Subway',
                    gtm: 'click_brands_subway'
                },
                {
                    url: '/takeaway/brands/yo-sushi',
                    text: 'Yo! Sushi',
                    gtm: 'click_brands_yo-sushi'
                },
                {
                    url: '/takeaway/brands',
                    text: 'View all brands',
                    gtm: 'click_brands_view_all'
                }
            ]
        },
        aboutUs: {
            title: 'A bit more about us',
            links: [
                {
                    url: 'https://restaurants.just-eat.co.uk/',
                    text: 'Restaurant sign up',
                    gtm: 'click_about_restaurant_signup'
                },
                {
                    url: '/pricepromise',
                    text: 'Price promise',
                    gtm: 'click_about_price_promise'
                },
                {
                    url: '/info/privacy-policy',
                    text: 'Privacy policy',
                    gtm: 'click_about_privacy_policy'
                },
                {
                    url: '/info/terms-and-conditions',
                    text: 'Terms and Conditions',
                    gtm: 'click_about_tandcs'
                },
                {
                    url: '/info/cookies-policy',
                    text: 'Cookie Policy',
                    gtm: 'click_about_cookie_policy'
                },
                {
                    url: 'https://www.just-eat.com/about-us',
                    text: 'About Just Eat',
                    gtm: 'click_about_about_us'
                },
                {
                    url: 'https://www.just-eat.com/',
                    text: 'Company website',
                    gtm: 'click_about_company'
                },
                {
                    url: 'https://careers.just-eat.com/',
                    text: 'Careers',
                    gtm: 'click_about_careers'
                },
                {
                    url: 'https://www.just-eat.com/download_file/view/912/1',
                    text: 'Modern Slavery Statement',
                    target: '_blank',
                    rel: 'noopener',
                    gtm: 'click_about_modern_slavery_statement'
                }
            ]
        }
    },
    linkButtonList: [],
    downloadOurApps: 'Download our apps',
    appStoreIcons: [
        {
            url: 'https://app.adjust.com/oc511o_1455tm?utm_medium=internal&campaign=footer',
            name: 'ios',
            alt: 'Download on the App Store',
            gtm: 'click_download_ios_app'
        },
        {
            url: 'https://app.adjust.com/1455tm?utm_medium=internal&campaign=footer',
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
            url: 'https://www.facebook.com/justeat',
            name: 'facebook',
            alt: 'Just Eat on Facebook (leads to external site)',
            gtm: 'click_follow_facebook'
        },
        {
            url: 'https://twitter.com/JustEatUK',
            name: 'twitter',
            alt: 'Just Eat on Twitter (leads to external site)',
            gtm: 'click_follow_twitter'
        },
        {
            url: 'https://www.youtube.com/user/TVjusteat',
            name: 'youtube',
            alt: 'Just Eat on YouTube (leads to external site)',
            gtm: 'click_follow_youtube'
        }
    ],
    currentCountryName: 'United Kingdom',
    currentCountryKey: 'gb',
    countries: [
        {
            key: 'au',
            localisedName: 'Australia',
            siteUrl: 'https://www.menulog.com.au',
            gtm: 'click_country_au'
        },
        {
            key: 'at',
            localisedName: 'Österreich',
            siteUrl: 'https://www.lieferando.at',
            gtm: 'click_country_at'
        },
        {
            key: 'be',
            localisedName: 'België',
            siteUrl: 'https://www.takeaway.com/be',
            gtm: 'click_country_be'
        },
        {
            key: 'bg',
            localisedName: 'Bulgaria',
            siteUrl: 'https://www.takeaway.com/bg',
            gtm: 'click_country_bg'
        },
        {
            key: 'ca',
            localisedName: 'Canada',
            siteUrl: 'https://www.skipthedishes.com',
            gtm: 'click_country_ca'
        },
        {
            key: 'dk',
            localisedName: 'Danmark',
            siteUrl: 'https://www.just-eat.dk',
            gtm: 'click_country_dk'
        },
        {
            key: 'fr',
            localisedName: 'France',
            siteUrl: 'https://www.just-eat.fr/',
            gtm: 'click_country_fr'
        },
        {
            key: 'de',
            localisedName: 'Deutschland',
            siteUrl: 'https://www.lieferando.de',
            gtm: 'click_country_de'
        },
        {
            key: 'ie',
            localisedName: 'Ireland',
            siteUrl: 'https://www.just-eat.ie',
            gtm: 'click_country_ie'
        },
        {
            key: 'il',
            localisedName: 'Israel',
            siteUrl: 'https://www.10bis.co.il/next',
            gtm: 'click_country_il'
        },
        {
            key: 'it',
            localisedName: 'Italia',
            siteUrl: 'https://www.justeat.it',
            gtm: 'click_country_it'
        },
        {
            key: 'lu',
            localisedName: 'Luxembourg',
            siteUrl: 'https://www.takeaway.com/lu',
            gtm: 'click_country_lu'
        },
        {
            key: 'nl',
            localisedName: 'Nederland',
            siteUrl: 'https://www.thuisbezorgd.nl',
            gtm: 'click_country_nl'
        },
        {
            key: 'nz',
            localisedName: 'New Zealand',
            siteUrl: 'https://www.menulog.co.nz',
            gtm: 'click_country_nz'
        },
        {
            key: 'no',
            localisedName: 'Norge',
            siteUrl: 'https://www.just-eat.no',
            gtm: 'click_country_no'
        },
        {
            key: 'pl',
            localisedName: 'Polska',
            siteUrl: 'https://www.pyszne.pl',
            gtm: 'click_country_pl'
        },
        {
            key: 'pt',
            localisedName: 'Portugal',
            siteUrl: 'https://www.takeaway.com/pt',
            gtm: 'click_country_pt'
        },
        {
            key: 'ro',
            localisedName: 'Romania',
            siteUrl: 'https://www.takeaway.com/ro',
            gtm: 'click_country_ro'
        },
        {
            key: 'es',
            localisedName: 'España',
            siteUrl: 'https://www.just-eat.es',
            gtm: 'click_country_es'
        },
        {
            key: 'ch',
            localisedName: 'Schweiz',
            siteUrl: 'https://www.eat.ch',
            gtm: 'click_country_ch'
        },
        {
            key: 'ch',
            localisedName: 'Switzerland',
            siteUrl: 'https://www.eat.ch/en',
            gtm: 'click_country_ch_en'
        },
        {
            key: 'ch',
            localisedName: 'Suisse',
            siteUrl: 'https://www.eat.ch/fr',
            gtm: 'click_country_ch_fr'
        }
    ],
    changeCurrentCountry: 'You are on the UK website, click here to change.',
    paymentIcons: [
        {
            name: 'mastercard-securecode',
            alt: 'Mastercard Securecode'
        },
        {
            name: 'visa-verified',
            alt: 'Visa Verified'
        },
        {
            name: 'amex-safekey',
            alt: 'American Express Safekey'
        }
    ],
    metaLegalField: {}
};
