const express = require('express')
const router = express.Router();


const multer = require('multer');
const path = require('path');
const blogs = require('../models/blogs');

// Xác thực token middleware
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Lấy token từ header Authorization

  if (!token) {
    return res.sendStatus(401); // Yêu cầu xác thực
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.sendStatus(403); // Token hết hạn hoặc không hợp lệ
    }

    req.user = decoded; // Lưu thông tin người dùng từ token vào biến req.user
    next(); // Tiếp tục xử lý các yêu cầu tiếp theo
  });
};

// Get all blogs
router.get('/', async (req, res) => {
  try {

        // const userId = req.user.userId
        
        const blogs = await Blog.find();

    res.json(blogs)

  } catch (error) {
    console.error(error)
    console.log('False to get all blogs')
  }
})

//Create a blogs
router.post('/new', authenticateToken, async (req, res) => {

  const newBlog = new Blog({
    ...req.body,
    author: req.user.username,
    userId: req.user.userId,
  })

  try {
    const saveBlog = await newBlog.save()
    res.json(saveBlog)
    console.log('Add blog success')

  } catch (error) {
    console.error(error);
    console.log('Add blog false')
  }

})




module.exports = router
