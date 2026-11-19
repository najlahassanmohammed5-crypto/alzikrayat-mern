const User = require('../models/User');
const bcrypt = require('bcrypt');
const Joi = require('joi');

const registerSchema = Joi.object({
    firstName: Joi.string().min(2).max(50).required(),
    lastName: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    location: Joi.string().allow('').optional(),
    description: Joi.string().allow('').optional(),
    occupation: Joi.string().allow('').optional()
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

exports.register = async (req, res) => {
    try {
        const { error } = registerSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { firstName, lastName, email, password, location, description, occupation } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email is already registered' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            location,
            description,
            occupation
        });

        await newUser.save();

        const userResponse = newUser.toObject();
        delete userResponse.password;

        res.status(201).json({
            message: 'User registered successfully',
            user: userResponse
        });

    } catch (err) {
        console.error("REGISTER ERROR:",err);
           
        res.status(500).json({ message: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { error } = loginSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const userResponse = user.toObject();
        delete userResponse.password;

        res.status(200).json({
            message: 'Login successful',
            user: userResponse
        });

    } catch (err) {

        res.status(500).json({ message: 'Server error', error: err.message });
    }
};