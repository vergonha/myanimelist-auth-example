module.exports = app => {
    const controller = require('../controllers/callback')();
    app.route('/callback')
        .get(controller.callback)
};