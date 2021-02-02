const _ = require('lodash');

function trim (str) {
    return str.replace(/ /g, '');
}

function toTitleCase (str) {
    return trim(_.startCase(str));
}

function replaceHyphensWithWhitespace (str) {
    return str.replace(/-/g, ' ');
}

function hasMultipleWords (str) {
    return replaceHyphensWithWhitespace(str)
        .split(' ')
        .length > 1;
}

function prefixWithV (str) {
    return `v-${str}`;
}

function getComponentName (str) {
    return hasMultipleWords(str)
        ? toTitleCase(str)
        : toTitleCase(prefixWithV(str));
}

function getComponentFilename (str) {
    return `${trim(_.startCase(str))}`;
}

function getComponentTemplateName (str) {
    return hasMultipleWords(str)
        ? str
        : prefixWithV(str);
}

function getComponentClassName (str) {
    return _.camelCase(str);
}

function getReadmeName (str) {
    return _.startCase(str);
}

module.exports = {
    getComponentFilename,
    getComponentTemplateName,
    getComponentName,
    getComponentClassName,
    getReadmeName
};
