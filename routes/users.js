const express = require('express');
const router = express.Router();
const User = require('../models/User');
const {v4:uuidv4}= require('uuid');

router.get('/:id', async (req, res) => {
  
    const user = await User.findById(req.params.id);
    
    res.render('tasks',{user})
})

router.post('/login', async (req, res) => {
  const { username, token } = req.body;
  try {
    if (username && token) {
      const existingUser = await User.findOne({ username, token });
      if (existingUser) {
        console.log('Existing user found with valid token');
        const response = `/users/${existingUser._id}`;
        return res.status(200).json({ success: true, existingUser: true, response });
      } else {
        const generatedId = uuidv4();
        const newUser = new User({
          username,
          token: generatedId,
        });
        await newUser.save();
        console.log('Invalid token or username. Created new user:', newUser);
        const response = `/users/${newUser._id}`;
        return res.status(200).json({ success: true, response, newUser });
      }
    } else {
      const generatedId = uuidv4();
      const newUser = new User({
        username,
        token: generatedId,
      });
      await newUser.save();
      console.log('No token provided. Created new user:', newUser);
      const response = `/users/${newUser._id}`;
      return res.status(200).json({ success: true, response, newUser });
    }
  } catch (error) {
    console.error('Error occurred on login post:', error);
    return res.status(500).json({ success: false, message: 'Something went wrong' });
  }
});

module.exports = router;
