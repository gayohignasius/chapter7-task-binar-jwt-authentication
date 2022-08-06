const express = require('express');
const tokenVerification = require('../middleware/token.verification');
const postController = require('./post.controller');
const postRouter = express.Router();

postRouter.get('/', postController.getAllPosts)
postRouter.get("/api/v1/:postId", postController.getSinglePost);
postRouter.post('/api/v1/posts', tokenVerification, postController.createNewPost)
postRouter.put('/api/v1/posts/:postId', tokenVerification, postController.updatePost)
// postRouter.delete('/api/v1/posts/:userId', postController.deletePost)

module.exports = postRouter;
