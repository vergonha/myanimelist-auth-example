const cookieList = require("../utils/cookieList");

module.exports = () => {
    const controller = {};
    controller.callback = (req, res) => {
        res
            .status(200)
            .cookie('code', req.query.code)
            .render("callback")
    }

    return controller
};