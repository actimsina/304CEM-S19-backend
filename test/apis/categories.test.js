const axios = require('axios');
const baseurl = 'http://localhost:3001/categories';

describe('categoresAPI', () => {
    let categories;
    test('Post a category', async () => {
        let cat = await axios.post(baseurl, {
            'name': 'Home'
        })
        expect(cat.data.name).toBe('Home')
    })

    test('Get all categories', async () => {
        return axios.get(baseurl)
            .then((response) => {
                categories = response.data;
                expect(response.data.length).toBeGreaterThan(0);
            })
    })

    test('Find a category by id', async () => {
        return axios.get(baseurl + `/${categories[0]._id}`)
            .then((response) => {
                expect(response.data.name).toBe('Home');
            })
    })
    test('Update a category', async () => {
        return axios.put(baseurl + `/${categories[0]._id}`, {
            'name': 'Personal'
        })
            .then((response) => {
                expect(response.data.name).toBe('Personal');
            })
    })
    test('remove all categories', async () => {
        return axios.delete(baseurl)
            .then((response) => {
                expect(200)
            })
    })
})
