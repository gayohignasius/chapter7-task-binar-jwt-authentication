const postRepo = require('./post.repository');

const getAllPosts = async ({ q }) => {
  if (q) return await postRepo.getAllPostsByQuery({ q });
  else return await postRepo.getAllPosts();
};

const getSinglePost = async ({ postId }) => {
  return await postRepo.getSinglePost({ postId });
};

const createNewPost = async ({
  title,
  image,
  description,
  userId
}) => {
  return postRepo.createNewPost({ title, image, description, userId })
}

const updatePost = async ({
  postId,
  title,
  image,
  description
}) => {
  return await postRepo.updatePost({
    postId,
    title,
    image,
    description
  });
};


const postService = {
  getAllPosts,
  getSinglePost,
  createNewPost,
  updatePost,
}

module.exports = postService; 