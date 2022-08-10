const userService = require("./user.service");

const createNewUser = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    const newUser = await userService.createNewUser({
      fullName,
      email,
      password,
    });
    return res.json(newUser);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};

const editUser = async (req, res) => {
  const { userId } = req.params;
  const { fullName } = req.body;
  try {
    const newUser = await userService.editUser({
      userId,
      fullName,
    });
    return res.json(newUser);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};

const userController = {
  createNewUser,
  editUser
}

module.exports = userController