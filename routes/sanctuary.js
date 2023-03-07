module.exports = app => {
    const controller = require('../controllers/sanctuary')();
    app.route('/sanctuary')
        .get(controller.sanctuary)
};