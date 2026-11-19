const Photo = require('../models/Photo');
const fs = require('fs');
const path = require('path');

exports.uploadPhoto = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Please upload an image' });
        }

        const { title, description } = req.body;
        const userId = req.body.userId;

        if (!title) {
            fs.unlinkSync(req.file.path);
            return res.status(400).json({ message: 'Title is required' });
        }

        const newPhoto = new Photo({
            userId,
            fileName: req.file.filename,
            title,
            description
        });

        await newPhoto.save();

        res.status(201).json({
            message: 'Photo uploaded successfully',
            photo: newPhoto
        });

    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.getAllPhotos = async (req, res) => {
    try {
        const photos = await Photo.find()
            .populate('userId', 'firstName lastName')
            .sort({ createdAt: -1 });

        res.status(200).json(photos);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.getPhotoById = async (req, res) => {
    try {
        const photo = await Photo.findById(req.params.id)
            .populate('userId', 'firstName lastName');

        if (!photo) {
            return res.status(404).json({ message: 'Photo not found' });
        }

        res.status(200).json(photo);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.deletePhoto = async (req, res) => {
    try {
        const photo = await Photo.findById(req.params.id);

        if (!photo) {
            return res.status(404).json({ message: 'Photo not found' });
        }

        if (photo.userId.toString() !== req.body.userId) {
            return res.status(403).json({ message: 'You are not authorized to delete this photo' });
        }

        const filePath = path.join(__dirname, '../uploads', photo.fileName);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        await Photo.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: 'Photo deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};