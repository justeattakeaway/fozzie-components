const userMessageStub = require('./src/demo/user-message.stub.json');

module.exports = {
    port: 8080,
    before: app => {
        // [GET] `/user-message.json`
        app.get('/user-message.json', (req, res) => {
            res.json(userMessageStub);
        });
    }
};
