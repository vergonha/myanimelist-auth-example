module.exports = app => {
    const controller = require('../controllers/index')();
    app.route('/')
        .get(controller.index)
};