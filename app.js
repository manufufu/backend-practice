import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// IMPORT ROUTES
import studentRoutes from './routes/students.js';

const app = express();
app.use(express.json({ limit: "50kb" }));
dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/';

// ROUTES
app.use('/students', studentRoutes);

app.get('/', (req, res) => {
  res.send('Server is running');
});

mongoose
.connect(MONGO_URI)
.then(() => {
    console.log('Connected to MongoDB');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});