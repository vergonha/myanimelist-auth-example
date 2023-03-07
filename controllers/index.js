let config = require('../config/default.json')

module.exports = () => {
    const controller = {};
    controller.index = (req, res) => {
        res
            .status(200)
            .cookie('code_challenge', req.session.cookie.code_challenge)
            .cookie('client_id', config.api.client_id)
            .cookie('client_secret', config.api.client_secret)
            .render("index")
    }

    return controller
};
