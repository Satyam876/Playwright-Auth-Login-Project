const {test, expect} = require('../fixtures/authFixture.js');

test('Auth fixture test', async({authedRequest}) => {
    const response = await authedRequest.get('https://dummyjson.com/auth/me');
    expect(response.status()).toBe(200);


    const body = await response.json();
    expect(body.username).toBe('emilys');
})