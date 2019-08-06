export default {
    locale: 'nb-NO',
    linkLists: {
        customerService: {
            title: 'Kundeservice',
            links: [
                {
                    url: '/help',
                    text: 'Hjelp',
                    gtm: 'click_service_help'
                },
                {
                    url: '/account/login',
                    text: 'Logg inn',
                    rel: 'nofollow',
                    gtm: 'click_service_login'
                },
                {
                    url: '/account/register',
                    text: 'Registrer deg',
                    gtm: 'click_service_singup'
                }
            ]
        },
        cuisines: {
            title: 'Hva frister?',
            links: [
                {
                    url: '/take-away',
                    text: 'Take-away',
                    gtm: 'click_cuisine_take_away'
                },
                {
                    url: '/take-away/pizza',
                    text: 'Pizza',
                    gtm: 'click_cuisine_pizza'
                },
                {
                    url: '/take-away/sushi',
                    text: 'Sushi',
                    gtm: 'click_cuisine_suchi'
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
                },
                {
                    url: '/take-away/cuisines',
                    text: 'Alle kjøkkentyper',
                    gtm: 'click_cuisine_view_all'
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
                    url: '/take-away/cities',
                    text: 'Alle byer',
                    gtm: 'click_location_view_all'
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
                    text: 'Restaurant påmelding',
                    gtm: 'click_about_restaurant_singup'
                },
                {
                    url: '/about',
                    text: 'Om oss',
                    gtm: 'click_about_about_us'
                },
                {
                    url: 'https://partner.just-eat.no/',
                    text: 'Partner centre',
                    gtm: 'click_about_partner_centre'
                },
                {
                    url: '/jobs',
                    text: 'Ledige stillinger',
                    gtm: 'click_about_careers'
                },
                {
                    url: '/cookiespolicy',
                    text: 'Cookies',
                    gtm: 'click_about_cookie_policy'
                },
                {
                    url: '/privacy-policy',
                    text: 'Handelsvilkår',
                    gtm: 'click_about_privacy_policy'
                }
            ]
        }
    },
    linkButtonList: [],
    downloadOurApps: 'Last ned appen vår',
    appStoreIcons: [
        {
            url: 'https://itunes.apple.com/no/app/just-eat.no/id748246908?ls=1&mt=8',
            name: 'ios',
            alt: 'Hent i App Store',
            gtm: 'click_download_ios_app'
        },
        {
            url: 'https://play.google.com/store/apps/details?id=com.justeat.app.no',
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
        },
        {
            url: '/blog',
            name: 'rss',
            alt: 'Blog',
            gtm: 'click_follow_blog'
        }
    ],
    currentCountryName: 'Norge',
    currentCountryKey: 'no',
    countries: [
        {
            key: 'au',
            localisedName: 'Australia',
            siteUrl: 'https://www.menulog.com.au',
            gtm: 'click_country_au'
        },
        {
            key: 'br',
            localisedName: 'Brasil',
            siteUrl: 'https://www.ifood.com.br',
            gtm: 'click_country_br'
        },
        {
            key: 'ca',
            localisedName: 'Canada',
            siteUrl: 'https://www.just-eat.ca',
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
            localisedName: 'Frankrike',
            siteUrl: 'https://www.just-eat.fr/',
            gtm: 'click_country_fr'
        },
        {
            key: 'ie',
            localisedName: 'Irland',
            siteUrl: 'https://www.just-eat.ie',
            gtm: 'click_country_ie'
        },
        {
            key: 'it',
            localisedName: 'Italia',
            siteUrl: 'https://www.justeat.it',
            gtm: 'click_country_it'
        },
        {
            key: 'nz',
            localisedName: 'New Zealand',
            siteUrl: 'https://www.menulog.co.nz',
            gtm: 'click_country_nz'
        },
        {
            key: 'es',
            localisedName: 'Spania',
            siteUrl: 'https://www.just-eat.es',
            gtm: 'click_country_es'
        },
        {
            key: 'gb',
            localisedName: 'Storbritannia',
            siteUrl: 'https://www.just-eat.co.uk',
            gtm: 'click_country_gb'
        },
        {
            key: 'ch',
            localisedName: 'Sveits',
            siteUrl: 'https://www.eat.ch',
            gtm: 'click_country_ch'
        }
    ],
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
