const Task = require('../../models/tasks');
const mongoose = require('mongoose');
const testDB = 'mongodb://localhost:27017/tmTestingDB'
beforeAll(async () => {
    await mongoose.connect(testDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
});

describe('Task Schema Test', () => {
    it('Should add a new task', async () => {
        let newTask = await Task.create({
            'name': 'Buy apples',
            'author': new mongoose.mongo.ObjectId()
        })
        expect(newTask.name).toMatch('Buy');
    })
    it('Should remove the task', async () => {
        deletedTask = await Task.findOneAndRemove({ 'name': 'Buy apples' });
        expect(deletedTask.name).toMatch('apples');
    })
})