export default {
    locale: 'nb-NO',
    linkLists: {
        customerService: {
            title: 'Kundeservice',
            links: [
                {
                    url: '/account/login',
                    text: 'Logg inn',
                    rel: 'nofollow',
                    gtm: 'click_service_login'
                },
                {
                    url: '/account/register',
                    text: 'Registrer',
                    gtm: 'click_service_signup'
                },
                {
                    url: '/account',
                    text: 'Kontoinformasjon',
                    gtm: 'click_service_account'
                },
                {
                    url: '/help',
                    text: 'Hjelp',
                    gtm: 'click_service_help'
                }
            ]
        },
        cuisines: {
            title: 'Hva frister?',
            links: [
                {
                    url: '/take-away/pizza',
                    text: 'Pizza',
                    gtm: 'click_cuisine_pizza'
                },
                {
                    url: '/take-away/sushi',
                    text: 'Sushi',
                    gtm: 'click_cuisine_sushi'
                },
                {
                    url: '/take-away/indisk',
                    text: 'Indisk',
                    gtm: 'click_cuisine_indian'
                },
                {
                    url: '/take-away/thaimat',
                    text: 'Thaimat',
                    gtm: 'click_cuisine_thai'
                },
                {
                    url: '/take-away/kebab',
                    text: 'Kebab',
                    gtm: 'click_cuisine_kebab'
                }
            ]
        },
        locations: {
            title: 'Finn din by',
            links: [
                {
                    url: '/take-away/Oslo',
                    text: 'Oslo',
                    gtm: 'click_location_oslo'
                },
                {
                    url: '/take-away/Bergen',
                    text: 'Bergen',
                    gtm: 'click_location_bergen'
                },
                {
                    url: '/take-away/Trondheim',
                    text: 'Trondheim',
                    gtm: 'click_location_trondheim'
                },
                {
                    url: '/take-away/Drammen',
                    text: 'Drammen',
                    gtm: 'click_location_drammen'
                },
                {
                    url: '/take-away/Fredrikstad',
                    text: 'Fredrikstad',
                    gtm: 'click_location_fredrikstad'
                },
                {
                    url: '/take-away/Asker',
                    text: 'Asker & Bærum',
                    gtm: 'click_location_asker'
                },
                {
                    url: '/take-away/Skien/',
                    text: 'Skien',
                    gtm: 'click_location_skien'
                },
                {
                    url: '/take-away/Moss/',
                    text: 'Moss',
                    gtm: 'click_location_moss'
                },
                {
                    url: '/take-away/Sarpsborg/',
                    text: 'Sarpsborg',
                    gtm: 'click_location_sarpsborg'
                }
            ]
        },
        brands: {
            title: 'Brands',
            links: []
        },
        aboutUs: {
            title: 'Om oss',
            links: [
                {
                    url: '/take-away/bedrift-overtidsmat',
                    text: 'Bli med på Just Eat!',
                    gtm: 'click_about_restaurant_signup'
                },
                {
                    url: 'https://partner.just-eat.no/',
                    text: 'Partner Center',
                    gtm: 'click_about_partner_centre'
                },
                {
                    url: '/info/privacy-policy',
                    text: 'Personvernerklæring',
                    gtm: 'click_about_privacy_policy'
                },
                {
                    url: '/info/cookies-policy',
                    text: 'Cookie politikk',
                    gtm: 'click_about_cookie_policy'
                },
                {
                    url: '/help/',
                    text: 'Om Just Eat',
                    gtm: 'click_about_help'
                },
                {
                    url: 'https://giftcard-engine.gogift.com/NO/shop/justeatno/#/giftcards',
                    text: 'Gavekort til Just Eat',
                    gtm: 'click_about_giftcards'
                }
            ]
        }
    },
    linkButtonList: [],
    downloadOurApps: 'Last ned appen vår',
    appStoreIcons: [
        {
            url: 'https://app.adjust.com/n9wdqy?utm_medium=internal&campaign=footer',
            name: 'ios',
            alt: 'Hent i App Store',
            gtm: 'click_download_ios_app'
        },
        {
            url: 'https://app.adjust.com/xpnrha?utm_medium=internal&campaign=footer',
            name: 'android',
            alt: 'Finn den på Google Play',
            gtm: 'click_download_android_app'
        }
    ],
    feedback: 'Tilbakemelding',
    improveOurWebsite: 'Hjelp oss med å gjøre vår hjemmeside bedre',
    sendFeedback: 'Send tilbakemelding',
    followUs: 'Følg oss',
    socialIcons: [
        {
            url: 'https://www.facebook.com/JustEatNO/',
            name: 'facebook',
            alt: 'Facebook',
            gtm: 'click_follow_facebook'
        }
    ],
    currentCountryName: 'Norge',
    currentCountryKey: 'no',
    changeCurrentCountry: 'Du er på den norske nettsiden, klikk her for å endre.',
    paymentIcons: [
        {
            name: 'visa-verified',
            alt: 'Visa Verified'
        },
        {
            name: 'mastercard-securecode',
            alt: 'Mastercard Securecode'
        }
    ],
    metaLegalField: {}
};
