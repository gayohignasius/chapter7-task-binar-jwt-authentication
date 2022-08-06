const {User} = require("../database/models");

//get user
const getUser = async ({ email }) => {
  return await User.findOne({where: { email }, raw: true })
}

// create new user
const createNewUser = async ({
  fullName,
  email,
  password
}) => {

  const userExists = await User.findOne({where: { email }, raw: true });

  if(!userExists) {
    return await User.create({
      fullName,
      email,
      password
    });
  }
};

const updateUser = async ({
  userId,
  fullName
}) => {
  return await User.update(
    {
      fullName,
    },
    {
      where: {
        id: userId,
      },
      returning: true,
    }
  );
}

const userRepository = {
  getUser,
  createNewUser,
  updateUser
}

module.exports = userRepository;