const cookieList = require("../utils/cookieList");
const getBearer = require("../utils/getBearer");
const { MyAnimeList } = require("../utils/MAL");

module.exports = () => {
    const controller = {};
    controller.sanctuary = async (req, res) => {

        let cookies = cookieList(req.headers.cookie)
        const bearer = await getBearer(
            cookies.client_id,
            cookies.client_secret,
            cookies.code,
            cookies.code_challenge
        );
        
        const API = new MyAnimeList(bearer)
        const [profileResponse, topAnimesResponse] = await Promise.all([
            API.getSelfProfile(),
            API.getAnimeRanking()
        ]);

        const profile = await profileResponse;
        const topAnimes = await topAnimesResponse;

        res
            .status(200)
            .cookie('bearer', bearer)
            .render("sanctuary", {
                profile: profile,
                topAnimes: topAnimes.data
            })
    };

    return controller
};