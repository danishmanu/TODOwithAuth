const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const taskRoutes = require('./routes/tasks');
const userRoutes = require('./routes/users');
require('dotenv').config();

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

const mongoUri = 'mongodb+srv://mshahilt:UCtudQ5p94lwCqBV@cluster0.p2hiu.mongodb.net/';
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// MongoDB connection
mongoose.connect(mongoUri)
  .then(() => console.log('Connected to Database'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Routes
app.use('/tasks', taskRoutes);
app.use('/users', userRoutes);

// Render login page
app.get('/', (req, res) => {
  res.render('login');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
