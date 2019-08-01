export default {
    locale: 'es-ES',
    linkLists: {
        customerService: {
            title: 'Servicio al cliente',
            links: [
                {
                    url: '/account/login/',
                    text: 'Inicia Sesión'
                },
                {
                    url: '/account/register/',
                    text: 'Regístrate'
                },
                {
                    url: '/blog/',
                    text: 'Nuestro blog'
                },
                {
                    url: '/account/info/',
                    text: 'Información De La Cuenta'
                }
            ]
        },
        cuisines: {
            title: 'Tipos de cocina',
            links: [
                {
                    url: '/a-domicilio/cerca-de-mi/pizza/',
                    text: 'Pizza a domicilio'
                },
                {
                    url: '/a-domicilio/cerca-de-mi/kebab/',
                    text: 'Kebab a domicilio'
                },
                {
                    url: '/a-domicilio/cerca-de-mi/comida-china/',
                    text: 'Comida china a domicilio'
                },
                {
                    url: '/a-domicilio/cerca-de-mi/sushi/',
                    text: 'Sushi a domicilio'
                },
                {
                    url: '/a-domicilio/cerca-de-mi/hamburguesas/',
                    text: 'Hamburguesas a domicilio'
                },
                {
                    url: '/a-domicilio/cerca-de-mi/',
                    text: 'Mas tipos de cocina'
                }
            ]
        },
        locations: {
            title: 'Ciudades',
            links: [
                {
                    url: '/a-domicilio/madrid/',
                    text: 'Madrid'
                },
                {
                    url: '/a-domicilio/barcelona/',
                    text: 'Barcelona'
                },
                {
                    url: '/a-domicilio/valencia/',
                    text: 'Valencia'
                },
                {
                    url: '/a-domicilio/zaragoza/',
                    text: 'Zaragoza'
                },
                {
                    url: '/a-domicilio/palmas-de-gran-canaria/',
                    text: 'Las Palmas'
                },
                {
                    url: '/a-domicilio/',
                    text: 'Más ciudades'
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
                    text: 'Registrarse en el restaurante'
                },
                {
                    url: '/info/acerca-de-just-eat/',
                    text: 'Quienes somos'
                },
                {
                    url: '/help/',
                    text: 'Ayuda'
                },
                {
                    url: '/info/garantia-de-precio/',
                    text: 'Garantía de precio'
                },
                {
                    url: '/info/politica-de-privacidad/',
                    text: 'Política de Privacidad'
                },
                {
                    url: '/info/terminos-y-condiciones/',
                    text: 'Términos y Condiciones'
                },
                {
                    url: '/info/politica-de-cookies/',
                    text: 'Política de Cookies'
                },
                {
                    url: '/blog/descuento-5e-just-eat/',
                    text: '5€ de descuento'
                },
                {
                    url: '/campana/afiliacion',
                    text: 'Programa de Afiliación'
                },
                {
                    url: 'https://partner.just-eat.es/',
                    text: 'Gestiona tu restaurante'
                }
            ]
        }
    },
    downloadOurApps: 'Descárgate la app',
    appStoreIcons: [
        {
            url: 'https://itunes.apple.com/es/app/just-eat/id615238455?&mt=8',
            name: 'ios',
            alt: 'Consíguelo en el App Store'
        },
        {
            url: 'https://play.google.com/store/apps/details?id=com.justeat.app.es',
            name: 'android',
            alt: 'Disponible en Google play'
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
            alt: 'Facebook'
        },
        {
            url: 'https://twitter.com/JustEat_es',
            name: 'twitter',
            alt: 'Twitter'
        },
        {
            url: 'https://www.just-eat.es/blog',
            name: 'rss',
            alt: 'Blog'
        },
        {
            url: 'https://www.instagram.com/justeat_es/',
            name: 'instagram',
            alt: 'Instagram'
        }
    ],
    currentCountryName: 'España',
    currentCountryKey: 'es',
    countries: [
        {
            key: 'au',
            localisedName: 'Australia',
            siteUrl: 'https://www.menulog.com.au'
        },
        {
            key: 'br',
            localisedName: 'Brasil',
            siteUrl: 'https://www.ifood.com.br'
        },
        {
            key: 'ca',
            localisedName: 'Canadá',
            siteUrl: 'https://www.just-eat.ca'
        },
        {
            key: 'dk',
            localisedName: 'Dinamarca',
            siteUrl: 'https://www.just-eat.dk'
        },
        {
            key: 'fr',
            localisedName: 'Francia',
            siteUrl: 'https://www.just-eat.fr/'
        },
        {
            key: 'ie',
            localisedName: 'Irlanda',
            siteUrl: 'https://www.just-eat.ie'
        },
        {
            key: 'it',
            localisedName: 'Italia',
            siteUrl: 'https://www.justeat.it'
        },
        {
            key: 'no',
            localisedName: 'Noruega',
            siteUrl: 'https://www.just-eat.no'
        },
        {
            key: 'nz',
            localisedName: 'Nueva Zelanda',
            siteUrl: 'https://www.menulog.co.nz'
        },
        {
            key: 'gb',
            localisedName: 'Reino Unido',
            siteUrl: 'https://www.just-eat.co.uk'
        },
        {
            key: 'ch',
            localisedName: 'Suiza',
            siteUrl: 'https://www.eat.ch'
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
    vatInfo: 'Confianza'
};
