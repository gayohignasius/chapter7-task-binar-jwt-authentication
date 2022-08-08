const postRepo = require('./post.repository');

const getAllPosts = async ({ q }) => {
  if (q) return await postRepo.getAllPostsByQuery({ q });
  else return await postRepo.getAllPosts();
};

const getSinglePost = async ({ postId }) => {
  return await postRepo.getSinglePost({ postId });
};

const getAllPostsByUserId = async ({ writer }) => {
  return await postRepo.getAllPostsByUserId({ writer });
};

const createNewPost = async ({ title, image, description, userId }) => {
  return postRepo.createNewPost({ title, image, description, userId });
};

const updatePost = async ({ postId, title, image, description, authUser }) => {
  return await postRepo.updatePost({
    postId,
    title,
    image,
    description,
    authUser,
  });
};

const postService = {
  getAllPosts,
  getSinglePost,
  getAllPostsByUserId,
  createNewPost,
  updatePost,
};

module.exports = postService; 