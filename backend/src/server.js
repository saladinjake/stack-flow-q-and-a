const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');

dotenv.config();

const swaggerDocument = YAML.load(path.join(__dirname, '../swagger.yaml'));
const app = express();

const questionRoutes = require('./routes/questionRoutes');
const answerRoutes = require('./routes/answerRoutes');

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/questions', questionRoutes);
app.use('/api/answers', answerRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'DevFlow API is healthy' });
});

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/devflow';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
    if (process.env.NODE_ENV !== 'test') {
      app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
    }
  })
  .catch(err => console.error('MongoDB connection error:', err));

module.exports = app;
