const _ = require('lodash');

function toTitleCase(str) {
    return trim(_.startCase(str));
}

function trim(str) {
    return str.replace(/ /g, '');
}

function replaceHyphensWithWhitespace(str) {
    return str.replace(/-/g, ' ');
}

function hasMultipleWords(str) {
    return replaceHyphensWithWhitespace(str)
        .split(' ')
        .length > 1;
}

function prefixWithVue(str) {
    return `vue-${str}`;
}

function getComponentName(str) {
    return hasMultipleWords(str)
        ? toTitleCase(str)
        : toTitleCase(prefixWithVue(str));
}

function getComponentFilename(str) {
    return `${trim(_.startCase(str))}`;
}

function getComponentTemplateName(str) {
    return hasMultipleWords(str)
        ? str
        : prefixWithVue(str);
}

function getComponentClassName(str) {
    return _.camelCase(str);
}

function getReadmeName(str) {
    return _.startCase(str);
}

module.exports = {
    getComponentFilename,
    getComponentTemplateName,
    getComponentName,
    getComponentClassName,
    getReadmeName
};
