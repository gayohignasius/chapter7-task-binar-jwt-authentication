const { Post } = require('../database/models');
const { Op } = require("sequelize");

// cari semua post
const getAllPosts = async () => {
  return await Post.findAll();
};

// cari post berdasarkan query
const getAllPostsByQuery = async ({ search }) => {
  return await Post.findAll({
    where: {
      title: {
        [Op.substring]: search,
      },
    },
  });
};

// cari satu post (detail post)
const getAllPostsByPostId = async ({ postId }) => {
  return await Post.findByPk(postId);
};

// cari semua post berdasarkan userId
const getAllPostsByUserId = async ({ writer }) => {
  return await Post.findAll({
    where: { userId: writer },
  });
};

// buat post baru
const createNewPost = async ({ title, image, description, userId }) => {
  return await Post.create({
    title,
    image,
    description,
    userId,
  });
};

// edit post
const updatePost = async ({ postId, title, image, description, authUser }) => {
  return await Post.update(
    {
      title,
      image,
      description,
    },
    {
      where: {
        [Op.and]: {
          id: postId,
          userId: authUser,
        },
      },
      returning: true,
    }
  );
};

const postRepository = {
  getAllPosts,
  getAllPostsByQuery,
  getAllPostsByUserId,
  getAllPostsByPostId,
  createNewPost,
  updatePost,
};

module.exports = postRepository;