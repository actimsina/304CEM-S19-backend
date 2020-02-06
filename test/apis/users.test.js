const axios = require('axios');

const baseurl = 'http://localhost:3001/users';

describe('Users Route Test', () => {
    let token;
    test('sign up of new user', () => {
        return axios.post(baseurl + '/signup', {
            firstName: 'Achyut',
            lastName: 'Timsina',
            username: 'test123',
            password: 'test123'
        }).then((response) => {
            expect(response.data.status).toMatch('Success');
        }).catch((err) => {
            expect(err.response.status).toBe(500);
            expect(err.response.data.status).toMatch('Username already exists!');
        })
    })
    test('login of existing user', () => {
        return axios.post(baseurl + '/login', {
            username: 'test123',
            password: 'test123'
        }).then((response) => {
            token = response.data.token;
            expect(response.status).toBe(200);
            expect(response.data.status).toMatch('Login Successful!');
        }).catch((err) => {
            expect(err.response.status).toBe(500);
        })
    })

    test('User should be able to view profile', () => {
        return axios.get(baseurl + '/me', {
            'headers': { 'Authorization': 'Bearer ' + token }
        }).then((response) => {
            expect(response.status).toBe(200);
        })
    })
})