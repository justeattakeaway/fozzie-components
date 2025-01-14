export default {
    locale: 'es-ES',
    companyName: 'Just Eat',
    openMenuText: 'Open Menu',
    loginNoScriptLinkText: 'Cuenta',
    skipToMainContentText: 'Ir al contenido principal',
    navTitle: 'Menú principal',

    navLinks: {
        orderHistory: {
            text: 'Pedidos',
            url: '/order-history',
            gtm: 'click_account_your_orders'
        },
        accountCredit: {
            text: 'Crédito de la cuenta',
            url: '/account/credit',
            gtm: 'click_account_credit'
        }
    },

    userMenu: {
        buttonLabel: name => `La cuenta de ${name}`
    },

    logo: {
        gtm: 'click_logo'
    },
    help: {
        text: 'Ayuda',
        url: '/help',
        gtm: 'click_help'
    },
    accountLogin: {
        text: 'Inicia sesión',
        url: '/account/login',
        gtm: 'click_login'
    },
    accountLogout: {
        text: 'Salir',
        url: '/account/logout',
        gtm: 'click_logout'
    },
    deliveryEnquiry: {
        text: 'Trabaja como repartidor',
        url: 'https://www.just-eat.es/repartidor?utm_source=mainsite&utm_medium=Referral&utm_campaign=RC_M_WS_ESP_ES_[SCOOB]_[AWRN]_[OWMD]_[Spanish]',
        gtm: 'click_courier_signup'
    },
    countrySelector: {
        selectYourCountryText: 'Selecciona tu país',
        currentCountryKey: 'es',
        changeCurrentCountry: 'Estás en Just Eat España, haz clic aquí para cambiar país',
        goBackToMainMenu: 'Vuelve al menú principal'
    },
    corporate: {
        text: 'Pedidos para Empresas',
        url: 'https://www.just-eat.es/business',
        gtm: 'click_corporate_ordering'
    }
};
