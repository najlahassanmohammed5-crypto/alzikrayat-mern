const Comment = require('../models/Comment');
const Photo = require('../models/Photo');

exports.addComment = async (req, res) => {
    try {
        const { photoId } = req.params;
        const { userId, comment } = req.body;

        if (!comment || comment.trim() === '') {
            return res.status(400).json({ message: 'Comment text is required' });
        }

        const photo = await Photo.findById(photoId);
        if (!photo) {
            return res.status(404).json({ message: 'Photo not found' });
        }

        const newComment = new Comment({
            photoId,
            userId,
            comment
        });

        await newComment.save();

        const populatedComment = await Comment.findById(newComment._id)
            .populate('userId', 'firstName lastName');

        res.status(201).json({
            message: 'Comment added successfully',
            comment: populatedComment
        });

    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.getCommentsByPhoto = async (req, res) => {
    try {
        const { photoId } = req.params;

        const comments = await Comment.find({ photoId })
            .populate('userId', 'firstName lastName')
            .sort({ createdAt: 1 });

        res.status(200).json(comments);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};