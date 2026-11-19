
const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required']
    },
    fileName: {
        type: String,
        required: [true, 'File name is required']
    },
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        maxlength: [200, 'Title cannot exceed 200 characters']
    },
    description: {
        type: String,
        trim: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Photo', photoSchema);