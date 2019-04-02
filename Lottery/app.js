const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const ApiResponse = require('./utils/response');
const userRoutes = require('./routes/lottery');

const app = express();

app.use(bodyParser.json({ extended: false }));

app.use(express.static(path.join(__dirname, 'views')));
app.use(userRoutes);

app.use((err, req, res, next) => {
  ApiResponse.error(res, err);
});

app.listen(8080);
