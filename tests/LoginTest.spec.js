import {test, expect} from '@playwright/test';
const AuthClient = require('../clients/authClient.js');
const env = require('../config/env.js');

test('Login Test', async({request}) => {
    const authClient = new AuthClient(request);
    const response = await authClient.login(env.username, env.password);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.username).toBe(env.username);
})