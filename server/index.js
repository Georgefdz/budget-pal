const express = require('express');
const cors = require('cors');

const app = express();
const router = require('./router');

const PORT = process.env.PORT || 3010;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extendend: true }));

//Logging
app.use((req, res, next) => {
  console.log(`${req.method} request for '${req.url}'`)
})

app.use(router);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running in port: ${PORT}`);
});

