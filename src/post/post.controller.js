const postService = require("./post.service");

const getAllPosts = async (req, res) => {
  const { q } = req.query;

  try {
    const posts = await postService.getAllPosts( { q });
    if(posts && posts.length > 0)
      res.status(200).json(posts);
    else
      res.status(200).json({ message: "No post found!" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// const getSinglePost = async (req, res) => {
//   const { postId } = req.params;

//   try {
//     const posts = await postService.getSinglePost({ postId });
//     if (posts && posts.length > 0) res.status(200).json(posts);
//     else res.status(200).json({ message: "No post found!" });
//   } catch (error) {
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

const getAllPostsByUserId = async (req, res) => {
  const { writer } = req.query;
  console.log("writer:" + writer);

  const authUser = req.auth;

  try {
    if (writer == authUser.id) {
      const posts = await postService.getAllPostsByUserId({ writer });
      if (posts && posts.length > 0) res.status(200).json(posts);
      else res.status(200).json({ message: "No post found!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const createNewPost = async (req, res) => {
  const authUser = req.auth;
  const { title, image, description } = req.body;

  try {
    const newPost = await postService.createNewPost({
      title,
      image,
      description,
      userId: authUser.id,
    });
    return res.status(200).json(newPost);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const updatePost = async (req, res) => {
  const { postId } = req.params;
  const { title, image, description } = req.body;
  const authUser = req.auth.id;

  try {
    // const post = await postService.getSinglePost({ postId });
    // if (authUser.id == post.userId) {
    const updatePost = await postService.updatePost({
      postId,
      title,
      image,
      description,
      authUser,
    });
    if (updatePost) res.status(200).json(updatePost);
    else res.status(401).json({ message: "Unauthorized" });
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error!");
  }
};

const postController = {
  getAllPosts,
  getSinglePost,
  getAllPostsByUserId,
  createNewPost,
  updatePost,
};

module.exports = postController;