const Page = require('@justeat/f-wdio-utils/src/page.object');
const {
    FOOTER_COMPONENT,
    FOOTER_ICONS,
    DOWNLOAD_ICONS,
    COURIER_LINKS,
    SOCIAL_ICONS
} = require('./f-footer.selectors');

class Footer extends Page {

    get component () { return $(FOOTER_COMPONENT) }
    get icons () { return  $$(FOOTER_ICONS) }
    get downloadIcons () { return $$(DOWNLOAD_ICONS) }
    get socialIcons () { return $$(SOCIAL_ICONS) }
    get courierLinks () { return $(COURIER_LINKS) }
    get downloadIcon ()  { return this.downloadIconValue }
    get socialIcon () { return this.socialIconValue }

    set expectedDownloadIcon(icon) {
        this.downloadIconValue = this.downloadIcons.filter(element => element.getAttribute('data-test-id').includes(icon))[0];
    }

    set expectedSocialIcon(icon){
        this.socialIconValue = this.socialIcons.filter(element => element.getAttribute('data-test-id').includes(icon))[0];
    }

    open(locale = 'gb'){
        let countryFormatted = locale.toUpperCase();
        let formattedLocale = '';
        switch ( countryFormatted ){
            case 'GB':
            case 'AU':
                formattedLocale = `en-${countryFormatted}`
                break
            default: 
                throw new Error (`locale ${countryFormatted} is not supported`);
        }
        super.openComponent('organism', `footer-component&knob-Locale=${formattedLocale}`);
    }


    openAUWithExtraFeatures(){
        super.openComponent('organism', 'footer-component&knob-Show%20courier%20links=true&knob-Locale=en-AU');
    }

    openGBWithExtraFeatures(){
        super.openComponent('organism', 'footer-component&knob-Show%20courier%20links=true&knob-Locale=en-GB');
    }

    waitForComponent(){
        super.waitForComponent(this.component);
    }

    isComponentDisplayed(){
        return this.component.isDisplayed();
    }

    isDowloadIconDisplayed(){
        return this.downloadIcon.isDisplayed();
    }

    clickDownloadIcon(){
        return this.downloadIcon.click();
    }

    isSocialIconDisplayed(){
        return this.socialIcon.isDisplayed();
    }

    clickSocialIcon(){
        return this.socialIcon.click();
    }

    areCourierLinksDisplayed(){
        return this.courierLinks.isDisplayed();
    }
}

module.exports = Footer;
