import Vue from 'vue';

/**
 * Takes in the innerText of the element on which the directive resides and checks the last character for a period
 * If not then it adds one in a span tag for accessibility to help some screen readers. The reason for this is because
 * we are using braze and we can't guarantee use of periods in braze text. Also added in is a html tag stripper to
 * remove anything but the <b></b> tags braze may sometimes provide.
 */
Vue.directive('make-text-accessible', el => {
    const text = el.innerText.trim().replace(/(<(?!(?:b|\/b)\b)[^>]*>)/gi, '');
    const containsPeriod = ['.', '!', '?', ';', ':'].includes(text.slice(-1));
    el.innerHTML = containsPeriod ? text : `${text}<span class="is-visuallyHidden">.</span>`;
});
