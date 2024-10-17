const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Assuming the user model is in a 'models' directory
const {v4:uuidv4}= require('uuid');

router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id);
    res.render('tasks',{user})
})
// Login or create a new user
router.post('/login', async (req, res) => {
    console.log("iam here")
  const { username, token } = req.body;
console.log(token)
  const user = await User.findOne({username:username, token: token});
  console.log(user)
  try {
  if(user){
    console.log('hey user founded')

    const response = `/users/${user._id}`

    res.status(200).json({success: true,extingUser:true, response: response})
  }else{
    console.log('else case worked')
    const newUser = new User({
        username:  username,
        token: uuidv4()
    })

    await newUser.save();

    const newLoggedUser = await User.findOne({username:username});
    const response = `/users/${newLoggedUser._id}`

    res.status(200).json({success:true, response, newLoggedUser:newLoggedUser})

  }
}catch(error){
    console.log('error occured on login post', error);
    res.status(500).json({success: false, message: "something went wrong"})
}
});

module.exports = router;
