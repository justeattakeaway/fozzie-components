const path = require('path');
const fs = require('fs');

const CSS_DIST_PATH = '/dist/css';
const CSS_DIST_PATH_ABSOLUTE = path.join(process.cwd(), CSS_DIST_PATH);

const getCssDistFile = fileName => fs.readFileSync(path.join(CSS_DIST_PATH_ABSOLUTE, fileName)).toString();

module.exports = {
    getCssDistFile
};
