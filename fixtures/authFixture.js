const {test:base, expect, request} = require('@playwright/test');
const AuthClient = require('../clients/authClient.js');
const env = require('../config/env.js');

const test = base.extend({
    authedRequest : async ({}, use) => {
        const objContext = await request.newContext();
        const AuthClientInstance = new AuthClient(objContext);
        const response = await AuthClientInstance.login(env.username, env.password);
        expect(response.status()).toBe(200);

        const body = await response.json();
        const accessToken = body.accessToken;

        await objContext.dispose();

        const authRequest = await request.newContext({
            extraHTTPHeaders : {
                Authorization : `Bearer ${accessToken}`
            }
        })

        await use(authRequest);
        await authRequest.dispose();
    }
})

module.exports = {test, expect};