import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from "../models/userSchema.js";

const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret';

export const handleSignUp = async (req, res) =>  {
    try {
        const {name, email, password} = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Missing required fields: name, email, password' });
        }

        // don't allow duplicate emails
        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(409).json({ message: 'Email already registered' });
        }

        const hashed = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashed
        });

        await user.save();

        const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });

        res.status(201).json({ message: 'Account created successfully', token, user: { _id: user._id, name: user.name, email: user.email } });
    } catch (error) {
        console.error('handleSignUp error:', error);
        res.status(500).json({ message: error.message });
    }
}

export const handleLogin = async (req, res) =>  {
    try {
        const {email, password} = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Missing required fields: email, password' });
        }

        const user = await User.findOne({ email });

        if(!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });

        return res.status(200).json({ token, user: { _id: user._id, name: user.name, email: user.email } });
    } catch (error) {
        console.error('handleLogin error:', error);
        res.status(500).json({ message: error.message });
    }
}