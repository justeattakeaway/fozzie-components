const buildUrl = (componentType, componentName, path) => {
    let url = '/iframe.html?id=components-';

    switch (componentType.toLowerCase()) {
        case 'atom':
            url += 'atoms--';
            break;
        case 'molecule':
            url += 'molecules--';
            break;
        case 'molecule-folder':
            url += 'molecules-';
            break;
        case 'organism':
            url += 'organisms--';
            break;
        default:
            throw new Error(`${componentType} is not a valid component type. Please use 'atom', 'molecule', 'molecule-folder' or 'organism'`);
    }

    url += componentName;
    url += path;

    return url;
};

module.exports = {
    buildUrl
};
