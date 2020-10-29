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
                    gtm: 'click_service_signup'
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
                    gtm: 'click_cuisine_sushi'
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
                    url: '/domicilio/ferrara',
                    text: 'Ferrara',
                    gtm: 'click_location_ferrara'
                },
                {
                    url: '/domicilio/genova',
                    text: 'Genova',
                    gtm: 'click_location_genoa'
                },
                {
                    url: '/domicilio/padova',
                    text: 'Padova',
                    gtm: 'click_location_padua'
                },
                {
                    url: '/domicilio/parma',
                    text: 'Parma',
                    gtm: 'click_location_parma'
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
                    text: 'Informativa sulla Privacy',
                    gtm: 'click_about_privacy_policy'
                },
                {
                    url: '/informazioni/termini-e-condizioni',
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
                    url: '/help/',
                    text: 'Domande frequenti',
                    gtm: 'click_about_help'
                },
                {
                    url: '/informazioni/miglior-prezzo-garantito/',
                    text: 'Miglior Prezzo Garantito',
                    gtm: 'click_about_best_price_guarantee'
                },
                {
                    url: '/informazioni/suggerisci-un-ristorante',
                    text: 'Suggerisci un ristorante',
                    gtm: 'click_about_suggest_a_restaurant'
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
                    url: 'https://partner.justeat.it/',
                    text: 'Partner Center',
                    gtm: 'click_about_partner_centre'
                }
            ]
        }
    },
    linkButtonList: [],
    downloadOurApps: "Scarica l'app",
    appStoreIcons: [
        {
            url: 'https://app.adjust.com/6zamp7?utm_medium=internal&campaign=footer',
            name: 'ios',
            alt: 'Scarica su App Store',
            gtm: 'click_download_ios_app'
        },
        {
            url: 'https://app.adjust.com/60f9v1?utm_medium=internal&campaign=footer',
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
            key: 'gb',
            localisedName: 'United Kingdom',
            siteUrl: 'https://www.just-eat.co.uk',
            gtm: 'click_country_gb'
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
