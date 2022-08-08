const userService = require("./user.service");

const createNewUser = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    const newUser = await userService.createNewUser({
      fullName,
      email,
      password,
    });
    if (fullName != "" || email != "" || password != "") {
      if(newUser == undefined) {
        return res.status(401).json({ message: "Email already exists"});
      }
      return res.json(newUser);
    } else
      return res.status(401).json({ message: "Bad Requests!" })
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
      fullName
    });
    console.log(newUser)
    return res.json(newUser)
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
}

const userController = {
  createNewUser,
  editUser
}

module.exports = userController