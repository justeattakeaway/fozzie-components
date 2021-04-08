import path from 'path';

export default {
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/index.js'),
            name: 'f-services'
        }
    }
};
