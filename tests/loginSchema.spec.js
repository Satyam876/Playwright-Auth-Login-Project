const {test, expect} = require('@playwright/test');
const AuthClient = require('../clients/authClient.js');
const env = require('../config/env.js');
const Ajv = require('ajv');
const loginSchema = require('../schema/loginSchema.js');

test('Login Schema Test', async({request}) => {
    const authClient = new AuthClient(request);
    const response = await authClient.login(env.username, env.password);
    expect(response.status()).toBe(200);

    const body = await response.json();
    const ajv = new Ajv();
    const validate = ajv.compile(loginSchema);
    const isValid = validate(body);
    console.log(validate.errors);
    expect(isValid).toBe(true);
})