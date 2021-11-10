import keys from '@lib/keys';

const jwt = require('jsonwebtoken');

export async function get(req, res){

    const user = {
        isAdmin: false,
    };

    if(req.headers.cookie) {
        const {token} = get_cookies(req);
        if(token && jwt.verify(token, keys.jwt).role == 'admin') {
            user.isAdmin = true;
        }
    }

    res.end(JSON.stringify(user));
}

const get_cookies = (request) => {
    const cookies = {token: ''};
    if(request.headers.cookie != ''){
        request.headers && request.headers.cookie.split(';').forEach((cookie) => {
            const parts = cookie.match(/(.*?)=(.*)$/)
            if (!parts) { return; }
            cookies[ parts[1].trim() ] = (parts[2] || '').trim();
        });
    }
    return cookies;
};