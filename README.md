
# MyAnimeList Web Authentication 🌸
My Anime List's API documentation is confusing and doesn't explain exactly what to do to authenticate your users. This repository is intended to help you with that. **Step By Step.**

## Reference

- [Official MAL Documentation](https://myanimelist.net/apiconfig/references/api/v2)
- [This Forum Topic](https://myanimelist.net/forum/?topicid=1850649)

## API Access
You can get your access key pair from [this](https://myanimelist.net/apiconfig) link.

- Add your keys in the [config/default.json](https://github.com/vergonha/myanimelist-auth-example/blob/main/config/default.json) file

```json
{
    "server": {
        "port": 3000
    },
    "api": {
        "client_id": CLIENT_KEY,
        "client_secret": SECRET_KEY
    }
}
```

## Demonstration
![Example](https://i.imgur.com/Vdu97LB.gif)

## Authorization Step by Step
**1 - Create your API Key**

You can get your access key pair from [this](https://myanimelist.net/apiconfig) link.

**2 - Create and Storage *code_challenge* token.**

The challenge code is a required token to identify your requests until you get the Bearer Token. This provides protection against attacks such as cross-site request forgery. See [RFC-6749.](https://datatracker.ietf.org/doc/html/rfc6749#section-4.1)

You can store it in many ways, I added it as a cookie when creating my express app.

```javascript
// Location: config/express.js

app.use(session({
    secret: "secret",
    cookie: { "code_challenge": codeChallenge() },
}))
```

**codeChallenge()** is a function that generates a random token. You can see how it works in [utils/codeChallenge.js](https://github.com/vergonha/myanimelist-auth-example/blob/main/utils/codeChallenge.js).


**3 - Config File and First Request**

You can store your tokens however you like, I've stored them inside the [default.json](https://github.com/vergonha/myanimelist-auth-example/blob/main/config/default.json) file and stored them in the [session](http://expressjs.com/en/resources/middleware/session.html) as cookies.

Example:
```javascript
// Location: controllers/index.js

module.exports = () => {
    const controller = {};
    controller.index = (req, res) => {
        res
            .cookie('code_challenge', req.session.cookie.code_challenge)
            .cookie('client_id', config.api.client_id)
            .cookie('client_secret', config.api.client_secret)
            ...
    }
    return controller
};

```

Now, you must transform your **code_challenge** and **client_id** into a query, so that your user can authenticate on the official MyAnimeList website.

```javascript
// Location: public/javascript/index.js

function auth(){
    const cookies = cookieList();
    const base = "https://myanimelist.net/v1/oauth2/authorize?"
    let body = new URLSearchParams({
        response_type: "code",
        client_id: cookies.client_id,
        code_challenge: cookies.code_challenge
    });
    
    window.location.href = (base + body)
};
```

**cookieList()** is a function that separates session cookies into an easily accessible object. You can see how it works in [utils/cookieList.js](https://github.com/vergonha/myanimelist-auth-example/blob/main/utils/cookieList.js).

**4 - Handling Callback Code Token**

When you register your app, you choose a **callback** URL to be called after authentication. By this URL, as a query token, you will get the "code" token.

![Callback](https://imgur.com/iQLjD6zl.png)

You must save the token to use it in the next step.

**5 - Bearer Token**

Now let's get the Bearer Token, it is used to authenticate all your requests to the API. You must have with you:
- ID and Secret API Key
- Code token
- Code_Challenge 

The function to acquire the token can be described like this:

```javascript
// Location: utils/getBearer.js

async function getBearer(client_id, client_secret, code, code_challenge){
    const base = "https://myanimelist.net/v1/oauth2/token?"
    const body = new URLSearchParams({
        client_id: client_id,           // Step 1
        client_secret: client_secret,   // Step 1
        code: code,                     // Step 4 ( Callback Query )
        code_verifier: code_challenge,  // Step 2 ( getChallenge() )
        grant_type: 'authorization_code',
    });


    const response = await axios.post(base, body, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
    const access_token = await response.data.access_token;

    return access_token;

};
```

The response should look like this:

```json
{
  token_type: 'Bearer',
  expires_in: 2674800,
  access_token: 'eyJ0eXAiOiJKV1QiLC...',
  refresh_token: 'def502003e919d9...'
}
```

Now you already have the token to perform your API queries.

### Look at the file located in [utils/MAL.js](https://github.com/vergonha/myanimelist-auth-example/blob/main/utils/MAL.js) if you have questions about how to communicate with the API.

End. Stay positive! 🌸

![Footer](https://im3.ezgif.com/tmp/ezgif-3-6cadf0eb89.gif)
