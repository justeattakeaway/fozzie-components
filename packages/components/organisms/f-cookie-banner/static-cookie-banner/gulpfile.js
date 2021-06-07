const { src, dest, series } = require('gulp');
const log = require('fancy-log');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const del = require('del');
const { exec } = require('child_process');

const LOCALES = ['en-GB', 'es-ES', 'it-IT'];

const PATHS = {
    vueSrcFolder: './src',
    distFolder: '../dist/static',
    tempVueFolder: './.tmp-vue'
};

const replace = require('gulp-replace');

function setLocaleProp(locale) {
    return function replaceTemplateFnc () {
        log(`update locale prop -  ${locale}`);

    return src([`${PATHS.tempVueFolder}/${locale}.js`])
        .pipe(replace(/(attrs:{locale:"en-GB"})/g, `attrs:{locale:"${locale}"}`))
        .pipe(dest(PATHS.distFolder));
    }
}

function vueBuild (cb) {
    log('building Vue code into the directory');
    return exec(`yarn vue-cli-service build --dest ${PATHS.tempVueFolder}`, (err, stdout, stderr) => {
        log(stdout);
        log(stderr);
        cb(err);
    });
}

function cleanTmpFolders () {
    log('clear .tmp folders and dest folder');
    return del([PATHS.tempVueFolder, PATHS.distFolder], { force: true });
}

function cleanUp() {
    log('clear .tmp-dist foldeer');
    return del([PATHS.tempVueFolder], { force: true });
}

function concatJS (locale) {
    return function concatAndMoveJSFnc () {
        log(`move js into one file: ${locale}.js`);

        return src(`${PATHS.tempVueFolder}/js/*.js`)
            .pipe(concat(`${locale}.js`))
            .pipe(dest(PATHS.tempVueFolder));
    };
}

function moveCSS (locale) {
    return function moveCSSFnc () {
        log(`move css and renanme to: ${locale}.css`);

        return src(`${PATHS.tempVueFolder}/css/*.css`)
            .pipe(rename(`${locale}.css`))
            .pipe(dest(PATHS.distFolder));
    };
}

function defaultTask () {
    const tasks = LOCALES.map(locale => [
        vueBuild,
        moveCSS(locale),
        concatJS(locale),
        setLocaleProp(locale),
    ]);

    return series(
        cleanTmpFolders,
        ...tasks,
        cleanUp
    );
}

exports.default = defaultTask();
