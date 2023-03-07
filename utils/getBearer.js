const axios = require('axios')

async function getBearer(client_id, client_secret, code, code_challenge){
    const base = "https://myanimelist.net/v1/oauth2/token?"
    const body = new URLSearchParams({
        client_id: client_id,
        client_secret: client_secret,
        code: code,
        code_verifier: code_challenge,
        grant_type: 'authorization_code',
    });


    const response = await axios.post(base, body, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
    const access_token = await response.data.access_token;

    return access_token;

};

module.exports = getBearer