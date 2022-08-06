const { Post } = require('../database/models');
const { Op } = require("sequelize");
const { User } = require('../database/models');

// cari semua post
const getAllPosts = async () => {
  return await Post.findAll();
};

// cari post berdasarkan query 
const getAllPostsByQuery = async ({ q }) => {
  return await Post.findAll({
    where: {
      [Op.or]: {
        title: {
          [Op.substring]: q,
        },
        description: {
          [Op.substring]: q,
        },
      },
    },
  });
};

// cari satu post
const getSinglePost = async ({ postId }) => {
  return await Post.findByPk(postId);
};

// buat post baru
const createNewPost = async ({title, image, description, userId}) => {
  return await Post.create({
    title,
    image,
    description,
    userId
  });
}

// edit post
const updatePost = async ({
  postId,
  title,
  image,
  description,
}) => {
  console.log(postId)
  return await Post.update(
    {
      title,
      image,
      description,
    },
    {
      where: { id: postId },
      returning: true,
    }
  );
};

const postRepository = {
  getAllPosts,
  getAllPostsByQuery,
  getSinglePost,
  createNewPost,
  updatePost,
}

module.exports = postRepository;