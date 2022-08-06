const userRepo = require('./user.repository');
const bcrypt = require('bcrypt');
const saltRound = 10;

const createNewUser = async ({
  fullName,
  email,
  password,
}) => {
  // const userExists = userRepo.getUser({ email });

  // if (!userExists) {
  const hashedPassword = await bcrypt.hash(password, saltRound); 
  return userRepo.createNewUser({
    fullName,
    email,
    password: hashedPassword
  });
  // } else {
  //   return res.status(401).json({message: "Email already exists!"})
  // }
};

const editUser = async ({
  userId,
  fullName
}) => {
  return await userRepo.updateUser({
    userId,
    fullName,
  });
};

const userService = {
  createNewUser,
  editUser
}

module.exports = userService;