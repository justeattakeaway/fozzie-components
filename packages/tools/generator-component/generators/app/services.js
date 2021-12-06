const utils = require('./utils');

/**
 *
 * @param {string} name – String input during prompts for the name of the component
 * @returns Object – transformed group of names to be used in the generator template files
 */
function transformName (name) {
    // prevents component folders from being generated in `camelCase`
    const normalisedName = utils.getHyphenatedName(name).toLowerCase();

    return {
        class: utils.getComponentClassName(normalisedName), // (c-)header or (c-)userMessage,
        component: utils.getComponentName(normalisedName), // e.g VButton or UserMessage,
        default: normalisedName, // e.g. header or user-message
        filename: utils.getComponentFilename(normalisedName), // Header(.vue) or UserMessage(.vue)
        readme: utils.getReadmeName(normalisedName), // Header or User Message
        template: utils.getComponentTemplateName(normalisedName) // v-header or user-message
    };
}

/**
 * Get Today's date in Changelog format
 *
 * @returns Object - day/month/year values
 */
function setDate () {
    const date = new Date();

    return {
        day: date.toLocaleString('en-GB', { day: 'numeric' }),
        month: date.toLocaleString('en-GB', { month: 'long' }),
        year: date.toLocaleString('en-GB', { year: 'numeric' })
    };
}

/**
 *
 *
 * @param Object answers - Answers given by the user to the generator prompts
 * @returns String - Path of the destination folder to be used for the component
 */
function setDestinationFolder (answers) {
    let destinationFolder = 'packages/';

    // add to path based on the componentType
    if (answers.componentType === 'uiComponent') {
        destinationFolder += 'components/';
    } else if (answers.componentType === 'service') {
        destinationFolder += 'services/';
    }

    // add to path based on the componentCategory
    if (answers.componentCategory) {
        destinationFolder += `${answers.componentCategory}s/`;
    }

    return destinationFolder;
}

module.exports = {
    transformName,
    setDate,
    setDestinationFolder
};
