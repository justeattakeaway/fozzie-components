const { src, dest, series } = require('gulp');
const log = require('fancy-log');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const del = require('del');
const { exec } = require('child_process');

const LOCALES = ['en-GB', 'es-ES', 'it-IT'];

const PATHS = {
    vueSrcFolder: './src',
    distFolder: './dist',
    tempVueFolder: './.tmp-vue'
};

const replace = require('gulp-replace');

function setVueProps(locale) {
    return function replaceTemplateFnc () {
        log(`update locale prop -  ${locale}`);

    return src([`${PATHS.vueSrcFolder}/App.vue`])
        .pipe(replace(/locale='(.*?)'(.*?)/g, `locale='${locale}'`))
        .pipe(dest(PATHS.vueSrcFolder));
    }
}

function vueBuild (cb) {
    log('running vue-cli-service build ');
    return exec(`yarn vue-cli-service build --dest ${PATHS.tempVueFolder}`, (err, stdout, stderr) => {
        log(stdout);
        log(stderr);
        cb(err);
    });
}

function cleanTmpFolders () {
    log('clear .tmp folders and dest folder');
    return del([PATHS.tempVueFolder, PATHS.distFolder, '../f-cookie-banner/.node_modules/.cache/vue-loader'], { force: true });
}

function clearVueCliCache () {
    log('clear ./node_modules/.cache');
    return del(['./node_modules/.cache/vue-loader'], { force: true });
}

function cleanUp() {
    log('clear .tmp-dist folder');
    return del([PATHS.tempVueFolder], { force: true });
}

function concatJS (locale) {
    return function concatAndMoveJSFnc () {
        log(`move js into one file: ${locale}.js`);

        return src(`${PATHS.tempVueFolder}/js/*.js`)
            .pipe(concat(`${locale}.js`))
            .pipe(dest(PATHS.distFolder));
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
        clearVueCliCache,
        setVueProps(locale),
        vueBuild,
        moveCSS(locale),
        concatJS(locale),
    ]);

    return series(
        cleanTmpFolders,
        ...tasks,
        cleanUp
    );
}

exports.default = defaultTask();
