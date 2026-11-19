
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    photoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Photo',
        required: [true, 'Photo ID is required']
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required']
    },
    comment: {
        type: String,
        required: [true, 'Comment text is required'],
        trim: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Comment', commentSchema);
// Comment schema definition
