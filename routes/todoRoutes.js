const express = require('express')
const router = express.Router();
const Todo = require('../models/todos')
const jwt = require('jsonwebtoken');
const secretKey = '333';

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

//Get all todo routes
// router.get('/', async (req, res) => {
//     const todos = await Todo.find()
//     res.json(todos)
// })

// Endpoint xử lý lấy danh sách công việc của từng người dùng
router.get('/',authenticateToken, async (req, res) => {
    try {  
        const userId = req.user.userId
     
      // Lấy danh sách công việc của người dùng tương ứng
      const todos = await Todo.find({ userId });
  
      res.json(todos);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách công việc:', error);
      res.status(500).json({ message: 'Lỗi khi lấy danh sách công việc' });
    }
  });


// Created a new todo
router.post('/new', authenticateToken, async (req, res) => {
    const newTodoData = {
      ...req.body,
      userId: req.user.userId, // Gán userId từ thông tin đã được xác thực
    };
  
    const newTodo = new Todo(newTodoData);
  
    try {
      const savedTodo = await newTodo.save();
      res.json(savedTodo);
      console.log("Add todo success")
    } catch (error) {
      console.error('Error:', error);
      console.log("Add todo false")
      res.status(500).json({ message: 'Thêm mới todo thất bại' });
    }
  });

//Get by ID
router.get('/get/:id', async (req, res) => {
    const t = await Todo.findById({ _id: req.params.id })
    res.json(t)
})

//Delete by ID
router.delete('/delete/:id', async (req, res) => {
    const tDelete = await Todo.findByIdAndDelete({ _id: req.params.id })
    res.json(tDelete)
})

//Update by ID
router.put('/update/:id', async (req, res) => {
    const tUpdate = await Todo.findByIdAndUpdate(
        { _id: req.params.id }, { $set: req.body } ,
    )
    res.json(tUpdate)
})


//Count total todo
router.get('/count',authenticateToken, async (req , res) => {
    try{
        const userId = req.user.userId

        // count total todo
        const totalCount = await Todo.countDocuments({ userId });
        // count todo was completed
        const completedCount = await Todo.countDocuments({ userId, completed: true });
        const unfinishedCount = totalCount - completedCount;
        res.json({ totalCount , completedCount , unfinishedCount })
    }catch{
        console.error('Lỗi khi đếm số lượng todo: ', error);
    }
})


module.exports = router
