const { Post } = require('../database/models');
const { Op } = require("sequelize");

// cari semua post
const getAllPosts = async ({ search, writer, sort, page, size }) => {
  const searching = search || "";
  const user = writer || 0;
  const pages = Number.parseInt(page) || 0;
  const sizes = Number.parseInt(size) || 3;
  let sorting = sort || "title";

  sort ? (sorting = sort.split(",")) : (sorting = [sorting]);
  let sortBy = {};
  if (sorting[1]) {
    sortBy[sorting[0]] = sorting[1];
  } else sortBy[sorting[0]] = "asc";

  let data = {};
  if (user != 0) {
    data = await Post.findAndCountAll({
      where: {
        userId: {
          [Op.in]: [user],
        },
      },
      order: [[sortBy]],
      limit: sizes,
      offset: sizes * pages,
    });
  } else {
    data = await Post.findAndCountAll({
      where: {
        title: {
          [Op.substring]: searching,
        },
      },
      order: [[sorting]],
      limit: sizes,
      offset: sizes * pages,
    });
  }
  let posts = {
    data: data.rows,
    totalPages: Math.ceil(data.count / sizes),
  };

  return posts;
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
  getAllPostsByUserId,
  getAllPostsByPostId,
  createNewPost,
  updatePost,
};

module.exports = postRepository;