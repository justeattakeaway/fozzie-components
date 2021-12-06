const _ = require('lodash');

function trim (str) {
    return str.replace(/ /g, '');
}

function toTitleCase (str) {
    return trim(_.startCase(str));
}

function isCamelCase (str) {
    return /[A-Z]/.test(str);
}

function splitCamelCase (str) {
    return str.split(/(?=[A-Z])/);
}

function replaceCamelCaseWithHyphens (str) {
    return splitCamelCase(str)
    .join('-')
    .toLowerCase();
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

function getHyphenatedName (str) {
    // avoids incorrect naming when generating a component
    return isCamelCase ? replaceCamelCaseWithHyphens(str) : str;
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
    getHyphenatedName,
    getComponentTemplateName,
    getComponentName,
    getComponentClassName,
    getReadmeName
};
