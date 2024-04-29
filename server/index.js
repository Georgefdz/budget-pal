const express = require('express');
const cors = require('cors');

const app = express();
const router = require('./router');

const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extendend: true }));

app.use(router);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running in port: ${PORT}`);
});
