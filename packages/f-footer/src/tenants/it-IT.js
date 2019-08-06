export default {
    locale: 'it-IT',
    linkLists: {
        customerService: {
            title: 'Servizio Clienti',
            links: [
                {
                    url: '/account/login/',
                    text: 'Accedi',
                    gtm: 'click_service_login'
                },
                {
                    url: '/account/register/',
                    text: 'Registrati',
                    gtm: 'click_service_singup'
                },
                {
                    url: '/blog/',
                    text: 'Blog',
                    gtm: 'click_service_blog'
                },
                {
                    url: '/account/info/',
                    text: 'Il mio account',
                    gtm: 'click_service_account'
                },
                {
                    url: '/help/',
                    text: 'Aiuto?',
                    gtm: 'click_service_help'
                }
            ]
        },
        cuisines: {
            title: 'Cucine',
            links: [
                {
                    url: '/domicilio/vicino-a-me/pizza/',
                    text: 'Pizza a domicilio',
                    gtm: 'click_cuisine_pizza'
                },
                {
                    url: '/domicilio/vicino-a-me/cinese',
                    text: 'Cinese a domicilio',
                    gtm: 'click_cuisine_chinese'
                },
                {
                    url: '/domicilio/vicino-a-me/sushi-giapponese/',
                    text: 'Sushi a domicilio',
                    gtm: 'click_cuisine_suchi'
                },
                {
                    url: '/domicilio/vicino-a-me/kebab/',
                    text: 'Kebab a domicilio',
                    gtm: 'click_cuisine_kebab'
                },
                {
                    url: '/domicilio/vicino-a-me/',
                    text: 'Tutti i tipi di cucine',
                    gtm: 'click_cuisine_view_all'
                }
            ]
        },
        locations: {
            title: 'Città',
            links: [
                {
                    url: '/domicilio/palermo/',
                    text: 'Palermo',
                    gtm: 'click_location_palermo'
                },
                {
                    url: '/domicilio/roma/',
                    text: 'Roma',
                    gtm: 'click_location_rome'
                },
                {
                    url: '/domicilio/milano/',
                    text: 'Milano',
                    gtm: 'click_location_milan'
                },
                {
                    url: '/domicilio/napoli/',
                    text: 'Napoli',
                    gtm: 'click_location_naples'
                },
                {
                    url: '/domicilio/torino/',
                    text: 'Torino',
                    gtm: 'click_location_turin'
                },
                {
                    url: '/domicilio/bologna/',
                    text: 'Bologna',
                    gtm: 'click_location_bologna'
                },
                {
                    url: '/domicilio/citta/',
                    text: 'Tutte le città',
                    gtm: 'click_location_view_all'
                }
            ]
        },
        brands: {
            title: 'Brands',
            links: []
        },
        aboutUs: {
            title: 'Chi siamo',
            links: [
                {
                    url: '/informazioni/privacy-policy/',
                    text: 'Termini e Condizioni',
                    gtm: 'click_about_tandcs'
                },
                {
                    url: '/informazioni/politica-dei-cookie/',
                    text: 'Cookie Policy',
                    gtm: 'click_about_cookie_policy'
                },
                {
                    url: '/informazioni/about-us/',
                    text: 'Informazioni su Just Eat',
                    gtm: 'click_about_about_us'
                },
                {
                    url: '/faq/',
                    text: 'Domande frequenti',
                    gtm: 'click_about_faq'
                },
                {
                    url: '/informazioni/miglior-prezzo-garantito/',
                    text: 'Miglior Prezzo Garantito',
                    gtm: 'click_about_best_price_guarantee'
                },
                {
                    url: '/informazioni/lavora-con-noi/',
                    text: 'Lavora con noi',
                    gtm: 'click_about_work_with_us'
                },
                {
                    url: '/informazioni/driver-partner/',
                    text: 'Diventa un Rider',
                    gtm: 'click_about_couriers'
                },
                {
                    url: '/informazioni/media-and-press/',
                    text: 'Area stampa',
                    gtm: 'click_about_media_and_press'
                },
                {
                    url: '/app/',
                    text: 'Le nostre App',
                    gtm: 'click_about_app'
                }
            ]
        }
    },
    linkButtonList: [],
    downloadOurApps: "Scarica l'app",
    appStoreIcons: [
        {
            url: 'https://itunes.apple.com/it/app/justeat.it-ristoranti-domicilio/id495607955?mt=8',
            name: 'ios',
            alt: 'Scarica su App Store',
            gtm: 'click_download_ios_app'
        },
        {
            url: 'https://play.google.com/store/apps/details?id=com.justeat.app.it',
            name: 'android',
            alt: 'Disponibile su Google Play',
            gtm: 'click_download_android_app'
        }
    ],
    feedback: 'Feedback',
    improveOurWebsite: 'Aiutaci a migliorare il nostro sito',
    sendFeedback: 'Invia feedback',
    followUs: 'Seguici su:',
    socialIcons: [
        {
            url: 'https://www.facebook.com/justeatitaly',
            name: 'facebook',
            alt: 'Facebook',
            gtm: 'click_follow_facebook'
        },
        {
            url: 'https://twitter.com/JustEat_it',
            name: 'twitter',
            alt: 'Twitter',
            gtm: 'click_follow_twitter'
        }
    ],
    currentCountryName: 'Italia',
    currentCountryKey: 'it',
    countries: [
        {
            key: 'au',
            localisedName: 'Australia',
            siteUrl: 'https://www.menulog.com.au',
            gtm: 'click_country_au'
        },
        {
            key: 'br',
            localisedName: 'Brasile',
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
            localisedName: 'Danimarca',
            siteUrl: 'https://www.just-eat.dk',
            gtm: 'click_country_dk'
        },
        {
            key: 'fr',
            localisedName: 'Francia',
            siteUrl: 'https://www.just-eat.fr/',
            gtm: 'click_country_fr'
        },
        {
            key: 'ie',
            localisedName: 'Irlanda',
            siteUrl: 'https://www.just-eat.ie',
            gtm: 'click_country_ie'
        },
        {
            key: 'no',
            localisedName: 'Norvegia',
            siteUrl: 'https://www.just-eat.no',
            gtm: 'click_country_no'
        },
        {
            key: 'nz',
            localisedName: 'Nuova Zelanda',
            siteUrl: 'https://www.menulog.co.nz',
            gtm: 'click_country_nz'
        },
        {
            key: 'gb',
            localisedName: 'Regno Unito',
            siteUrl: 'https://www.just-eat.co.uk',
            gtm: 'click_country_uk'
        },
        {
            key: 'es',
            localisedName: 'Spagna',
            siteUrl: 'https://www.just-eat.es',
            gtm: 'click_country_es'
        },
        {
            key: 'ch',
            localisedName: 'Svizzera',
            siteUrl: 'https://www.eat.ch',
            gtm: 'click_country_ch'
        }
    ],
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
            name: 'paypal',
            alt: 'PayPal'
        }
    ],
    changeCurrentCountry: 'Sei sul sito Italiano, licca qui per cambiare stato.',
    metaLegalField: {
        textField: 'Just Eat Italy S.r.l. - P.IVA 07392740960',
        icon: {}
    }
};
