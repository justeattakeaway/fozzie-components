export default {
    customerServiceTitle: 'Customer service',
    customerServiceLinks: [
        {
            url: '/contact',
            text: 'Contact us'
        },
        {
            url: '/account/login',
            text: 'Log in',
            rel: 'nofollow'
        },
        {
            url: '/account/register',
            text: 'Sign up'
        },
        {
            url: '/blog',
            text: 'Blog'
        },
        {
            url: '/apps',
            text: 'Mobile apps'
        },
        {
            url: '/member/updateuserinfo',
            text: 'My account'
        }
    ],
    cuisines: 'Top cuisines',
    cuisineLinks: [
        {
            url: '/takeaway/nearme/chinese',
            text: 'Chinese'
        },
        {
            url: '/takeaway/nearme/indian',
            text: 'Indian'
        },
        {
            url: '/takeaway/nearme/italian',
            text: 'Italian'
        },
        {
            url: '/takeaway/nearme/sushi',
            text: 'Sushi'
        },
        {
            url: '/takeaway/nearme/pizza',
            text: 'Pizza'
        },
        {
            url: '/takeaway/nearme',
            text: 'View all cuisines'
        }
    ],
    towns: 'Locations',
    locationLinks: [
        {
            url: '/takeaway/birmingham',
            text: 'Birmingham'
        },
        {
            url: '/takeaway/cardiff',
            text: 'Cardiff'
        },
        {
            url: '/takeaway/glasgow',
            text: 'Glasgow'
        },
        {
            url: '/takeaway/leeds',
            text: 'Leeds'
        },
        {
            url: '/takeaway/manchester',
            text: 'Manchester'
        },
        {
            url: '/takeaway',
            text: 'View all locations'
        }
    ],
    brands: 'Brands',
    brandLinks: [],
    aboutUs: 'A bit more about us',
    aboutUsLinks: [
        {
            url: 'https://restaurants.just-eat.co.uk/',
            text: 'Restaurant sign up'
        },
        {
            url: 'https://couriers.just-eat.co.uk/application',
            text: 'Deliver with Just Eat'
        },
        {
            url: '/pricepromise',
            text: 'Price promise'
        },
        {
            url: '/privacy-policy',
            text: 'Privacy policy'
        },
        {
            url: '/termsandconditions',
            text: 'Terms and Conditions'
        },
        {
            url: '/cookiespolicy',
            text: 'Cookie Policy'
        },
        {
            url: 'https://www.justeatplc.com/about-us/our-business',
            text: 'About us'
        },
        {
            url: 'https://www.just-eat.com/',
            text: 'Company website'
        },
        {
            url: 'https://careers.just-eat.com/',
            text: 'Careers'
        },
        {
            url: 'https://www.justeatplc.com/download_file/view/435/1',
            text: 'Modern Slavery Statement',
            target: '_blank'
        }
    ],
    downloadOurApps: 'Download our apps',
    appStoreIcons: [
        {
            url: 'https://app.adjust.com/oc511o_1455tm?utm_medium=internal&campaign=homepage',
            key: 'ios',
            iconSrc: 'iosIconSrc',
            altText: 'Download on the App Store'
        },
        {
            url: 'https://app.adjust.com/1455tm?utm_medium=internal&campaign=homepage',
            key: 'android',
            iconSrc: 'androidIconSrc',
            altText: 'Get it on Google Play'
        }
    ],
    feedback: 'Feedback',
    improveOurWebsite: 'Help us improve our website',
    sendFeedback: 'Send feedback',
    followUs: 'Follow us',
    socialIcons: [
        {
            url: 'https://www.facebook.com/justeat',
            key: 'facebook',
            iconSrc: 'facebookIconUrl',
            altText: 'Just Eat on Facebook'
        },
        {
            url: 'https://twitter.com/JustEatUK',
            key: 'twitter',
            iconSrc: 'twitterIconUrl',
            altText: 'Just Eat on Twitter'
        },
        {
            url: 'https://www.youtube.com/user/TVjusteat',
            key: 'youtube',
            iconSrc: 'youtubeIconUrl',
            altText: 'Just Eat on YouTube'
        }
    ],
    currentCountryLocalisedName: 'United Kingdom',
    currentCountryFlagKey: 'gb',
    countries: [
        {
            key: 'au',
            flagUrl: 'australiaFlagIconUrl',
            localisedName: 'Australia',
            siteUrl: 'https://www.menulog.com.au'
        },
        {
            key: 'br',
            flagUrl: 'brasilFlagIconUrl',
            localisedName: 'Brazil',
            siteUrl: 'https://www.ifood.com.br'
        },
        {
            key: 'ca',
            flagUrl: 'canadaFlagIconUrl',
            localisedName: 'Canada',
            siteUrl: 'https://www.just-eat.ca'
        },
        {
            key: 'dk',
            flagUrl: 'denmarkFlagIconUrl',
            localisedName: 'Denmark',
            siteUrl: 'https://www.just-eat.dk'
        },
        {
            key: 'fr',
            flagUrl: 'franceFlagIconUrl',
            localisedName: 'France',
            siteUrl: 'https://www.just-eat.fr/'
        },
        {
            key: 'ie',
            flagUrl: 'irelandFlagIconUrl',
            localisedName: 'Ireland',
            siteUrl: 'https://www.just-eat.ie'
        },
        {
            key: 'it',
            flagUrl: 'italyFlagIconUrl',
            localisedName: 'Italy',
            siteUrl: 'https://www.justeat.it'
        },
        {
            key: 'nz',
            flagUrl: 'newzealandFlagIconUrl',
            localisedName: 'New Zealand',
            siteUrl: 'https://www.menulog.co.nz'
        },
        {
            key: 'no',
            flagUrl: 'norwayFlagIconUrl',
            localisedName: 'Norway',
            siteUrl: 'https://www.just-eat.no'
        },
        {
            key: 'es',
            flagUrl: 'spainFlagIconUrl',
            localisedName: 'Spain',
            siteUrl: 'https://www.just-eat.es'
        },
        {
            key: 'ch',
            flagUrl: 'switzerlandFlagIconUrl',
            localisedName: 'Switzerland',
            siteUrl: 'https://www.eat.ch'
        }
    ],
    changeCurrentCountry: 'You are on the UK website. Click here to change.',
    buttonClose: 'Close',
    paymentIcons: [
        {
            type: 'card',
            key: 'mastercard--securecode',
            iconSrc: 'mastercardIconSrc',
            altText: 'Mastercard'
        },
        {
            type: 'card',
            key: 'visa--verified',
            iconSrc: 'visaIconSrc',
            altText: 'Visa'
        },
        {
            type: 'card',
            key: 'amex--safekey',
            iconSrc: 'amexIconSrc',
            altText: 'American Express'
        }
    ],
    vatInfo: ''
};
