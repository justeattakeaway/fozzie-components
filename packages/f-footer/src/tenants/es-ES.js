export default {
    locale: 'es-ES',
    linkLists: {
        customerService: {
            title: 'Servicio al cliente',
            links: [
                {
                    url: '/account/login/',
                    text: 'Inicia Sesión',
                    gtm: 'click_service_login'
                },
                {
                    url: '/account/register/',
                    text: 'Regístrate',
                    gtm: 'click_service_singup'
                },
                {
                    url: '/blog/',
                    text: 'Nuestro blog',
                    gtm: 'click_service_blog'
                },
                {
                    url: '/account/info/',
                    text: 'Información De La Cuenta',
                    gtm: 'click_service_account'
                }
            ]
        },
        cuisines: {
            title: 'Tipos de cocina',
            links: [
                {
                    url: '/a-domicilio/cerca-de-mi/pizza/',
                    text: 'Pizza a domicilio',
                    gtm: 'click_cuisine_pizza'
                },
                {
                    url: '/a-domicilio/cerca-de-mi/kebab/',
                    text: 'Kebab a domicilio',
                    gtm: 'click_cuisine_kebab'
                },
                {
                    url: '/a-domicilio/cerca-de-mi/comida-china/',
                    text: 'Comida china a domicilio',
                    gtm: 'click_cuisine_chinese'
                },
                {
                    url: '/a-domicilio/cerca-de-mi/sushi/',
                    text: 'Sushi a domicilio',
                    gtm: 'click_cuisine_suchi'
                },
                {
                    url: '/a-domicilio/cerca-de-mi/hamburguesas/',
                    text: 'Hamburguesas a domicilio',
                    gtm: 'click_cuisine_burgers'
                },
                {
                    url: '/a-domicilio/cerca-de-mi/',
                    text: 'Mas tipos de cocina',
                    gtm: 'click_cuisine_view_all'
                }
            ]
        },
        locations: {
            title: 'Ciudades',
            links: [
                {
                    url: '/a-domicilio/madrid/',
                    text: 'Madrid',
                    gtm: 'click_location_madrid'
                },
                {
                    url: '/a-domicilio/barcelona/',
                    text: 'Barcelona',
                    gtm: 'click_location_barcelona'
                },
                {
                    url: '/a-domicilio/valencia/',
                    text: 'Valencia',
                    gtm: 'click_location_valencia'
                },
                {
                    url: '/a-domicilio/zaragoza/',
                    text: 'Zaragoza',
                    gtm: 'click_location_saragossa'
                },
                {
                    url: '/a-domicilio/palmas-de-gran-canaria/',
                    text: 'Las Palmas',
                    gtm: 'click_location_las_palmas'
                },
                {
                    url: '/a-domicilio/',
                    text: 'Más ciudades',
                    gtm: 'click_location_view_all'
                }
            ]
        },
        brands: {
            title: 'Las marcas',
            links: []
        },
        aboutUs: {
            title: 'Sobre nosotros',
            links: [
                {
                    url: 'https://restaurantes.just-eat.es/',
                    text: 'Registrarse en el restaurante',
                    gtm: 'click_about_restaurant_singup'
                },
                {
                    url: '/info/acerca-de-just-eat/',
                    text: 'Quienes somos',
                    gtm: 'click_about_about_us'
                },
                {
                    url: '/help/',
                    text: 'Ayuda',
                    gtm: 'click_about_help'
                },
                {
                    url: '/info/garantia-de-precio/',
                    text: 'Garantía de precio',
                    gtm: 'click_about_price_guarantee'
                },
                {
                    url: '/info/politica-de-privacidad/',
                    text: 'Política de Privacidad',
                    gtm: 'click_about_privacy_policy'
                },
                {
                    url: '/info/terminos-y-condiciones/',
                    text: 'Términos y Condiciones',
                    gtm: 'click_about_tandcs'
                },
                {
                    url: '/info/politica-de-cookies/',
                    text: 'Política de Cookies',
                    gtm: 'click_about_cookie_policy'
                },
                {
                    url: '/blog/descuento-5e-just-eat/',
                    text: '5€ de descuento',
                    gtm: 'click_about_discount'
                },
                {
                    url: '/campana/afiliacion',
                    text: 'Programa de Afiliación',
                    gtm: 'click_about_affiliate_program'
                },
                {
                    url: 'https://partner.just-eat.es/',
                    text: 'Gestiona tu restaurante',
                    gtm: 'click_about_partner_centre'
                }
            ]
        }
    },
    linkButtonList: [],
    downloadOurApps: 'Descárgate la app',
    appStoreIcons: [
        {
            url: 'https://itunes.apple.com/es/app/just-eat/id615238455?&mt=8',
            name: 'ios',
            alt: 'Consíguelo en el App Store',
            gtm: 'click_download_ios_app'
        },
        {
            url: 'https://play.google.com/store/apps/details?id=com.justeat.app.es',
            name: 'android',
            alt: 'Disponible en Google play',
            gtm: 'click_download_android_app'
        }
    ],
    feedback: 'Opinión',
    improveOurWebsite: 'Ayúdanos a mejorar la web',
    sendFeedback: 'Enviar opinión',
    followUs: 'Síguenos',
    socialIcons: [
        {
            url: 'https://www.facebook.com/JustEat.es',
            name: 'facebook',
            alt: 'Facebook',
            gtm: 'click_follow_facebook'
        },
        {
            url: 'https://twitter.com/JustEat_es',
            name: 'twitter',
            alt: 'Twitter',
            gtm: 'click_follow_twitter'
        },
        {
            url: 'https://www.just-eat.es/blog',
            name: 'rss',
            alt: 'Blog',
            gtm: 'click_follow_blog'
        },
        {
            url: 'https://www.instagram.com/justeat_es/',
            name: 'instagram',
            alt: 'Instagram',
            gtm: 'click_follow_instagram'
        }
    ],
    currentCountryName: 'España',
    currentCountryKey: 'es',
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
            localisedName: 'Canadá',
            siteUrl: 'https://www.just-eat.ca',
            gtm: 'click_country_ca'
        },
        {
            key: 'dk',
            localisedName: 'Dinamarca',
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
            key: 'it',
            localisedName: 'Italia',
            siteUrl: 'https://www.justeat.it',
            gtm: 'click_country_it'
        },
        {
            key: 'no',
            localisedName: 'Noruega',
            siteUrl: 'https://www.just-eat.no',
            gtm: 'click_country_no'
        },
        {
            key: 'nz',
            localisedName: 'Nueva Zelanda',
            siteUrl: 'https://www.menulog.co.nz',
            gtm: 'click_country_nz'
        },
        {
            key: 'gb',
            localisedName: 'Reino Unido',
            siteUrl: 'https://www.just-eat.co.uk',
            gtm: 'click_country_gb'
        },
        {
            key: 'ch',
            localisedName: 'Suiza',
            siteUrl: 'https://www.eat.ch',
            gtm: 'click_country_ch'
        }
    ],
    changeCurrentCountry: 'Estás en Just Eat España, haz clic aquí para cambiar país.',
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
        },
        {
            name: 'paypal',
            alt: 'PayPal'
        }
    ],
    metaLegalField: {
        textField: '',
        icon: {
            name: 'confianza',
            alt: 'Confianza'
        }
    }
};
