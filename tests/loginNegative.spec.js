const {test, expect} = require('@playwright/test');
const AuthClient = require('../clients/authClient.js');
const env = require('../config/env.js');

const testCases = [
    {description : 'Wrong username', payload : {username : 'abcd12', password : env.password}, expectedStatus : 400, expectedMessage : 'Invalid credentials'},
    {description : 'Wrong password', payload : {username : env.username, password : 'abcd12'}, expectedStatus : 400, expectedMessage : 'Invalid credentials'},
    {description : 'Wrong username and password', payload : {username : 'abcd12', password : 'abcd12'}, expectedStatus : 400, expectedMessage : 'Invalid credentials'}, 
    {description : 'Empty username', payload : {username : undefined, password : env.password}, expectedStatus : 400, expectedMessage : 'Username and password required'},
    {description : 'Empty password', payload : {username : env.username, password : undefined}, expectedStatus : 400, expectedMessage : 'Username and password required'},
    {description : 'Empty username and password', payload : {username : undefined, password : undefined}, expectedStatus : 400, expectedMessage : 'Username and password required'}
]

for(const tc of testCases){
    test(`Login Negative Test - ${tc.description}`, async({request}) => {
        const authClient = new AuthClient(request);
        const response = await authClient.login(tc.payload.username, tc.payload.password);
        expect(response.status()).toBe(tc.expectedStatus);

        const body = await response.json();
        expect(body.message).toBe(tc.expectedMessage);
    })
}