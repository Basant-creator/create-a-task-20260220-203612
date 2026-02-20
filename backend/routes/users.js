const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');
const bcrypt = require('bcryptjs');

// @route   PUT /api/users/:id
// @desc    Update user profile
// @access  Private
router.put('/:id', authMiddleware, async (req, res) => {
    const { name, email, password } = req.body;

    // Build user object
    const userFields = {};
    if (name) userFields.name = name;
    if (email) userFields.email = email;
    if (password) {
        if (password.length < 6) {
            return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
        }
        const salt = await bcrypt.genSalt(10);
        userFields.password = await bcrypt.hash(password, salt);
    }

    try {
        let user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Ensure user owns the profile or is an admin (not implemented)
        if (user.id.toString() !== req.user.id) {
            return res.status(401).json({ success: false, message: 'Not authorized to update this user' });
        }

        // Check if email already exists for another user
        if (email && email !== user.email) {
            const existingUser = await User.findOne({ email });
            if (existingUser && existingUser.id.toString() !== user.id.toString()) {
                return res.status(400).json({ success: false, message: 'Email already in use by another account' });
            }
        }

        user = await User.findByIdAndUpdate(
            req.params.id,
            { $set: userFields },
            { new: true, runValidators: true } // new: true returns the updated document
        ).select('-password'); // Don't return password

        res.json({ success: true, message: 'User updated successfully', data: { user } });

    } catch (err) {
        console.error(err.message);
        // Handle Mongoose validation errors
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            return res.status(400).json({ success: false, message: messages.join(', ') });
        }
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;