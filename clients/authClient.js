const env = require('../config/env.js');

class AuthClient {
    constructor(request) {
        this.request = request;
    }

    async login(username, password){
        const response = await this.request.post(`${env.baseUrl}/auth/login`, {
            data : {
                username : username,
                password : password
            }
        });
        return response;
    }
}

module.exports = AuthClient;