const Category = require('../../models/categories');
const mongoose = require('mongoose');
const testDB = 'mongodb://localhost:27017/demotm_test'

beforeAll(async () => {
    await mongoose.connect(testDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
})

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
})

describe('Test of Category Schema', () => {
    test('Should create a new category', () => {
        return Category.create({
            name: 'Home'
        }).then((response) => {
            expect(response.name).toBe('Home')
        })
    })
    test('Should update the category', () => {
        return Category.findOne({ 'name': 'Home' })
            .then((cat) => {
                cat.name = 'Personal'
                cat.save().then((updatedCat) => {
                    expect(updatedCat.name).toBe('Personal')
                })
            })
    })
    test('Should delete the category', () => {
        return Category.findOneAndDelete({ 'name': 'Personal' })
            .then((response) => {
                expect(response.name).toBe('Personal')
            })
    })
})

