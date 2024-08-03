const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./database');
const authRoutes = require('./authRoutes');
const eventRoutes = require('./eventRoutes');
const sessionRoutes = require('./sessionRoutes');
const weatherRoutes = require('./weatherRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/events', eventRoutes);
app.use('/sessions', sessionRoutes);
app.use('/weather', weatherRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
