const express = require('express')
const router = express.Router();
const User = require('../models/users');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const secretKey = '333';

//Get all user routes
router.get('/', async (req, res) => {
    const users = await User.find()
    res.json(users)
})

//Create a new user
router.post('/register', async (req, res) => {
    const { name, username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(400).json({ message: "Username này đã tồn tại" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        name,
        username,
        password: hashedPassword,
    }
    );
    const savedUser = await newUser.save()
    res.json(savedUser)
    console.log('success add user !')
})

// Login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: "Username không tồn tại" });
        }

        const isCorrectPassword = await bcrypt.compare(password, user.password);
        if (!isCorrectPassword) {
            return res.status(401).json({ message: "Mật khẩu sai" });
        }

        const token = jwt.sign({ userId: user._id, username: user.username, name: user.name }, secretKey, { expiresIn: '1h' }); // Token hết hạn sau 1 giờ

        // Success respeonse end give back data of user
        return res.status(200).json({ message: "Đăng nhập thành công", user: { name: user.name, username: user.username }, token });
    } catch (error) {
        // Xử lý lỗi và trả về thông báo lỗi cụ thể
        console.error('Error:', error);
        return res.status(500).json({ message: "Đăng nhập thất bại" });
    }
})


module.exports = router