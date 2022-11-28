const Joi = require('joi');
const express = require('express');
require('dotenv-flow').config();
const app = express();
const userRouter = require("./routes/user.router");

app.use(express.json());
app.use('/api/users', userRouter);

const port = process.env.APP_PORT;
app.listen(port, () => console.log(`API Listening on port ${port}...`));