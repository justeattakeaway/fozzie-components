<template>
    <div
        :class="[$style['c-cookieBanner'], $style['cpOverlay']]"
        attr="data-cookie-consent-overlay">
        <div :class="$style['cpBanner']">
            <div
                id="dialog1"
                :class="$style['cpBanner-content']"
                role="dialog"
                aria-labelledby="cookieConsentLabel"
                aria-modal="true">
                <h2
                    id="cookieConsentLabel"
                    :class="$style['cpBanner-title']">
                    <a
                        name="cookieConsentTitle"
                        tabindex="-1"
                        data-consent-title>{{ copy.mainTitle }}</a>
                </h2>
                <p :class="$style['cpBanner-text']">
                    {{ copy.text1 }}
                </p>
                <p :class="$style['cpBanner-text']">
                    {{ copy.text2 }}
                </p>
                <p :class="[$style['cpBanner-text'], $style['cpBanner-text--last']]">
                    {{ copy.text3 }}
                    <a
                        :href="copy.linkHref"
                        :class="$style['cpBanner-link']"
                        target="_blank">{{ copy.linkText }}</a>
                    {{ copy.text4 }}
                </p>
            </div>
            <div :class="$style['cpBanner-CTA']">
                <button
                    :class="[$style['cpBanner-button'], $style['cpBanner-button--accept']]"
                    tabindex="0"
                    role="button"
                    data-button-accept>
                    {{ copy.buttonText2 }}
                </button>
                <button
                    :class="[$style['cpBanner-button'], $style['cpBanner-button--nonAccept']]"
                    tabindex="0"
                    role="button"
                    data-button-nonaccept>
                    {{ copy.buttonText1 }}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { globalisationServices } from '@justeat/f-services';
import tenantConfigs from '../tenants';

// const dataLayer = window.dataLayer || {};

export default {
    name: 'CookieBanner',
    components: {},
    props: {
        locale: {
            type: String,
            default: ''
        }
    },
    data () {
        const locale = globalisationServices.getLocale(tenantConfigs, this.locale, this.$i18n);
        const localeConfig = tenantConfigs[locale];
        const theme = globalisationServices.getTheme(locale);

        return {
            copy: { ...localeConfig },
            theme
        };
    }
};

// const cpConfig = {
//     cookieExclusionList: [
//         '_dc_gtm_',
//         '_ga',
//         '_gac_',
//         '_gid',
//         'AMP_TOKEN',
//         'incap_ses_',
//         'je-',
//         'nlbi_',
//         'optimizelyEndUserId',
//         'optimizelyRedirectData',
//         'optimizelyDomainTestCookie',
//         'optimizelyOptOut',
//         'ravelinDeviceId',
//         'ravelinSessionUuid',
//         'ravelinUuid',
//         '__zlcmid',
//         '__zlcprivacy'
//     ],
//     storageExclusionList: [
//         'optimizely_data$$',
//         'je-',
//         'JE-'
//     ]
// };

// const cpBannerContent = {
//     uk: {
//         linkHref: 'https://www.just-eat.co.uk/info/cookies-policy',
//         linkText: 'cookies notice',
//         mainTitle: 'Cookies',
//         text1: 'We use required cookies (and similar technologies) to make our platform work.',
//         text2: 'We\'d also like to use optional cookies to help us improve our platform by collecting information on how you use it.',
//         text3: 'For details about the cookies and technologies we use, see our ',
//         text4: '.  Using this banner will set a cookie on your device to remember your preferences.',
//         buttonText1: 'Accept only required cookies',
//         buttonText2: 'Accept all cookies'
//     },
//     ie: {
//         linkHref: 'https://www.just-eat.ie/info/cookies-policy',
//         linkText: 'cookies notice',
//         mainTitle: 'Cookies',
//         text1: 'We use required cookies (and similar technologies) to make our platform work.',
//         text2: 'We\'d also like to use optional cookies to help us improve our platform by collecting information on how you use it.',
//         text3: 'For details about the cookies and technologies we use, see our ',
//         text4: '.  Using this banner will set a cookie on your device to remember your preferences.',
//         buttonText1: 'Accept only required cookies',
//         buttonText2: 'Accept all cookies'
//     },
//     es: {
//         linkHref: 'https://www.just-eat.es/cookies-policy',
//         linkText: 'cookies notice',
//         mainTitle: 'Cookies (ES)',
//         text1: 'We use required cookies (and similar technologies) to make our platform work.',
//         text2: 'We\'d also like to use optional cookies to help us improve our platform by collecting information on how you use it.',
//         text3: 'For details about the cookies and technologies we use, see our ',
//         text4: '.  Using this banner will set a cookie on your device to remember your preferences.',
//         buttonText1: 'Accept only required cookies',
//         buttonText2: 'Accept all cookies'
//     }
// };

// const getTenant = function () {
//     return 'uk';
//     // return '{{RT country}}';
// };

// const buildBannerHtml = function () {
//     const content = cpBannerContent[getTenant()];
//     let bannerHtml = '	<div class="cpBanner">';
//     bannerHtml += '		<div class="cpBanner-content" role="dialog" id="dialog1" aria-labelledby="cookieConsentLabel" aria-modal="true">';
//     bannerHtml += `			<h2 class="cpBanner-title" id="cookieConsentLabel"><a name="cookieConsentTitle" tabindex="-1" data-consent-title>${content.mainTitle}</a></h2>`;
//     bannerHtml += `			<p class="cpBanner-text">${content.text1}</p>`;
//     bannerHtml += `			<p class="cpBanner-text">${content.text2}</p>`;
//     bannerHtml += `			<p class="cpBanner-text cpBanner-text--last">${content.text3}`;
//     bannerHtml += `				<a href="${content.linkHref}" class="cpBanner-link" target="_blank">${content.linkText}</a>`;
//     bannerHtml += `				${content.text4}</p>`;
//     bannerHtml += '		</div>';
//     bannerHtml += '		<div class="cpBanner-CTA">';
//     bannerHtml += `			<button class="cpBanner-button cpBanner-button--accept" tabindex="0" role="button" data-button-accept>${content.buttonText2}</button>`;
//     bannerHtml += `			<button class="cpBanner-button cpBanner-button--nonAccept" tabindex="0" role="button" data-button-nonaccept>${content.buttonText1}</button>`;
//     bannerHtml += '		</div>';
//     bannerHtml += '	</div>';
//     return bannerHtml;
// };

// const buildBanner = function () {
//     const cookiePreferenceBannerOverlay = document.createElement('div');
//     cookiePreferenceBannerOverlay.className = 'cpOverlay';
//     cookiePreferenceBannerOverlay.setAttribute('data-cookie-consent-overlay', '');
//     cookiePreferenceBannerOverlay.innerHTML = buildBannerHtml();
//     return cookiePreferenceBannerOverlay;
// };

// const setCookie = function (cookieName, cookieValue, cookieExpiresDays) {
//     const getExpiryDate = new Date();
//     getExpiryDate.setTime(getExpiryDate.getTime() + (cookieExpiresDays * 24 * 60 * 60 * 1000));
//     const cookieExpires = `expires=${getExpiryDate.toUTCString()}`;
//     document.cookie = `${cookieName}=${cookieValue};${cookieExpires};path=/`;
// };

// const isNotExcluded = function (name, excludedList) {
//     let isMatch = true;
//     for (let i = 0; i < excludedList.length; i++) {
//         const regex = new RegExp(excludedList[i].replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
//         if (regex.test(name) && isMatch) isMatch = false;
//     }
//     return isMatch;
// };

// const removeCookies = function () {
//     const cookies = document.cookie.split('; ');
//     for (let c = 0; c < cookies.length; c++) {
//         const cookieName = cookies[c].split(';')[0].split('=')[0];
//         if (isNotExcluded(cookieName, cpConfig.cookieExclusionList)) {
//             const d = window.location.hostname.split('.');
//             while (d.length > 0) {
//                 const cookieBase = `${encodeURIComponent(cookieName)}=; expires=Thu, 01-Jan-1970 00:00:01 GMT; domain=${d.join('.')} ;path=`;
//                 const path = location.pathname.split('/');
//                 document.cookie = `${cookieBase}/`;
//                 while (path.length > 0) {
//                     document.cookie = cookieBase + path.join('/');
//                     path.pop();
//                 }
//                 d.shift();
//             }
//         }
//     }
// };

// const removeStorage = function () {
//     if (!localStorage) return;
//     for (const i in localStorage) {
//         if (localStorage.hasOwnProperty(i)) {
//             if (isNotExcluded(i, cpConfig.storageExclusionList)) {
//                 localStorage.removeItem(i);
//             }
//         }
//     }
// };

// const dataLayerPush = function (consentLevel) {
//     dataLayer.push({ event: 'trackConsent', userData: { consent: consentLevel } });
// };

// const resendEvents = function () {
//     const excludeEvents = ['gtm.js', 'gtm.click', 'gtm.linkClick', 'gtm.triggerGroup', 'trackConsent', 'showConsent'];
//     for (let i = 0; i < dataLayer.length; i++) {
//         if (dataLayer[i].event && !excludeEvents.includes(dataLayer[i].event)) {
//             dataLayer[i].eventResent = dataLayer[i].event;
//             dataLayer[i]['gtm.uniqueEventId'] = Math.floor(100000 + Math.random() * 900000);
//             dataLayer.push(dataLayer[i]);
//         }
//         if (dataLayer[i].event && dataLayer[i].event === 'trackConsent' && (dataLayer[i].userData.consent === 'full' || dataLayer[i].userData.consent === 'necessary')) {
//             dataLayer.push({ eventResent: false });
//             break;
//         }
//     }
// };

// const removeLegacyCookieBanner = function () {
//     const oldCookieBanner = document.querySelector('[data-cookiebanner]');
//     const sitecoreCookieBanner = document.getElementsByClassName('cookie-policy')[0];
//     if (typeof oldCookieBanner !== 'undefined' && oldCookieBanner !== null) oldCookieBanner.innerHTML = '';
//     if (typeof sitecoreCookieBanner !== 'undefined' && sitecoreCookieBanner !== null) sitecoreCookieBanner.innerHTML = '';
// };

// const cpHideBanner = function () {
//     const cpBanner = document.querySelector('[data-cookie-consent-overlay]');
//     cpBanner.classList.add('hideCPBanner');
// };

// const cpAcceptAction = function () {
//     setCookie('je-cookieConsent', 'full', 180);
//     dataLayerPush('full');
//     resendEvents();
//     cpHideBanner();
// };

// const cpNonAcceptAction = function () {
//     removeCookies();
//     removeStorage();
//     setCookie('je-banner_cookie', '2', 90);
//     setCookie('je-cookieConsent', 'necessary', 90);
//     dataLayerPush('necessary');
//     cpHideBanner();
// };

// const addEventHandlers = function () {
//     const cpBannerAcceptButton = document.querySelector('[data-button-accept]');
//     const cpBannerNonAcceptButton = document.querySelector('[data-button-nonaccept]');
//     cpBannerAcceptButton.addEventListener('click', cpAcceptAction, false);
//     cpBannerNonAcceptButton.addEventListener('click', cpNonAcceptAction, false);
// };

// const showBanner = function () {
//     const cpBanner = document.querySelector('[data-cookie-consent-overlay]');
//     if (typeof cpBanner !== 'undefined' && cpBanner !== null) {
//         cpBanner.classList.remove('hideCPBanner');
//     } else {
//         document.body.appendChild(buildBanner());
//         addEventHandlers();
//     }
//     dataLayerPush('shown');
// };

// removeLegacyCookieBanner();
// showBanner();
// document.querySelector('[data-consent-title]').focus();

</script>

<style lang="scss" module>
.c-cookieBanner {
    font-family: $font-family-base;
    @include font-size(heading-m);
}

.cpOverlay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0,0,0,0.7);
    z-index: 99999991;
}

.cpBanner {
    background-color: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 99999992;
    display: flex;
    flex-direction: row;
}

.cpBanner-content,
.cpBanner-CTA {
    padding: 32px;
    margin: 0 auto;
}

.cpBanner-CTA {
    width: 352px;
}

.cpBanner-title {
    font-size: 24px;
    font-weight: 600;
    margin: 8px 0;
    padding: 0;
    color: #2a3846;
}

.cpBanner-text {
    font-size: 14px;
    margin: 0;
    padding: 0;
    color: #2a3846;
}

.cpBanner-link {
    color: #125fca;
}

.cpBanner-button {
    padding: 12px 1em;
    font-size: 16px;
    font-weight: 600;
    border: 1px solid rgba(0,0,0,0);
    border-radius: 2px;
    width: 288px;
}

.cpBanner-button--accept {
    color: #fff;
    background-color: #125fca;
}

.cpBanner-button--nonAccept {
    color: #125fca;
    background-color: #fff;
}

.hideCPBanner {
    display: none;
}

@media (max-width: 768px) {
    .cpBanner {
        flex-direction: column;
        padding: 16px 0;
    }

    .cpBanner-content,
    .cpBanner-CTA {
        padding: 4px 24px;
    }

    .cpBanner-CTA {
        width: initial;
        display: flex;
        flex-direction: row-reverse;
        margin: 0;
    }

    .cpBanner-button {
        width: initial;
    }
}

@media (max-width: 600px) {
    .cpBanner-content,
    .cpBanner-CTA {
        padding: 4px 16px;
    }

    .cpBanner-title {
        font-size: 20px;
    }

    .cpBanner-CTA {
        display: block;
        margin: 0 auto;
        width: 320px;
    }

    .cpBanner-button {
        width: 276px;
    }
}
</style>
