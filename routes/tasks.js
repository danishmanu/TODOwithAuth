const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Assuming the user model is in a 'models' directory

// Add a new task for a user
router.post('/:userId/add', async (req, res) => {
  const { userId } = req.params;
  const { title } = req.body;

  try {
    const user = await User.findById(userId);
    if (user) {
      user.tasks.push({ title });
      await user.save();

      res.redirect(`/users/${userId}`);
    } else {
      res.status(404).send('User not found');
    }
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Mark a task as completed
router.post('/:userId/complete/:taskId', async (req, res) => {
  const { userId, taskId } = req.params;

  try {
    const user = await User.findById(userId);
    if (user) {
      const task = user.tasks.id(taskId);
      if (task) {
        task.completed = true;
        await user.save();
        res.redirect(`/tasks/${userId}`);
      } else {
        res.status(404).send('Task not found');
      }
    } else {
      res.status(404).send('User not found');
    }
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Delete a task
router.post('/:userId/delete/:taskId', async (req, res) => {
    console.log("somethin went wrong")
  const { userId, taskId } = req.params;
  

  try {
    const user = await User.updateOne(
        { _id: userId },
        { $pull: { tasks: { _id: taskId } } }
      );
    if (user) {
    
      res.redirect(`/tasks/${userId}`);
    } else {
      res.status(404).send('User not found');
    }
  } catch (err) {
    res.status(500).send('Server error');
    console.log(err)
  }
});

// Get tasks for a user
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (user) {
      res.render('tasks', { username: user.username, tasks: user.tasks, userId });
    } else {
      res.status(404).send('User not found');
    }
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
