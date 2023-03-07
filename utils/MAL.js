const axios = require('axios')

class MyAnimeList{
    constructor(bearer){
        this.session = axios.create({
            baseURL: "https://api.myanimelist.net/v2",
            timeout: "1000",
            headers: { "Authorization": "Bearer " + bearer }
        });
    };

    fetch = async(endpoint, params) => {
        try {
            let body = params ? new URLSearchParams(params) : {}

            const response = await this.session.get(endpoint + body)
            const data = await response.data;
    
            return data;
        } catch { return "Error while fetching API data..." }
    };

    getSelfProfile(){ return this.fetch("/users/@me?", {'fields': 'anime_statistics'}) };
    getAnimeList(anime){ return this.fetch("anime?", {'q': anime, 'limit': 10}) };
    getAnimeRanking(){ return this.fetch("anime/ranking?", {'ranking_type': 'all', 'limit': 10}) };
    getUserAnimeList(user){ return this.fetch(`/users/${user}/animelist?`, {'fields': 'list_status', 'limit': 10}) };
};


module.exports = { MyAnimeList }