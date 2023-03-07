function cookieList(cookies){
    let documentCookies;

    if(cookies){documentCookies = cookies.split("; ")}
    else{documentCookies = document.cookie.split('; ')}

    const cookieToObjEntry = cookie => cookie.split('=');
    const cookieEntries = documentCookies.map(cookieToObjEntry);
    return Object.fromEntries(cookieEntries)
};

module.exports = cookieList