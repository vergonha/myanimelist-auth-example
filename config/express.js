const session =         require('express-session')
const express =         require("express");
const config =          require("config");
const path =            require('path')
const cors =            require('cors')
const codeChallenge =   require('../utils/codeChallenge')

module.exports = () => {
    const app = express();
    app.use(cors())

    app.set('port', process.env.PORT || config.get('server.port'))
    app.set('view engine', 'pug')

    app.use(session({
        secret: "banana",
        cookie: { "code_challenge": codeChallenge() },
    }))

    app.use(express.static(path.join(__dirname, '../public/javascript')));
    app.use(express.static(path.join(__dirname, '../public/assets')));
    app.use(express.static(path.join(__dirname, '../utils')));

    require('../routes/index')(app);
    require('../routes/callback')(app);
    require('../routes/sanctuary')(app);

    return app;
};