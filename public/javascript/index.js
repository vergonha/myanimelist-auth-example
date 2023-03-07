particlesJS.load('particle-js', 'particles.json');

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