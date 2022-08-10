require('dotenv').config()
const express = require('express');
const authRouter = require("./src/auth/auth.route");
const postRouter = require("./src/post/post.route");
const userRouter = require("./src/user/user.route");
const app = express();
const port = process.env.PROD_PORT || process.env.DEV_PORT;

app.use(express.json());

app.use(postRouter);
app.use(authRouter);
app.use(userRouter);


app.listen(port , ()=> console.log('> Server is up and running on port : ' + port))