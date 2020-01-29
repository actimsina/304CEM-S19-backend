const mongoose = require('mongoose');
const noteSchema = new mongoose.Schema({
    desc: {
        type: String,
        required: true
    }
});
const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    done: {
        type: Boolean,
        default: false
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    notes: [noteSchema]
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);