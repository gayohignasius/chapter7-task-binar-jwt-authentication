const userRepository = require("../../user/user.repository");

const registrationSchema = {
  fullName: {
    custom: {
      options: (value) => {
        return userRepository
          .getUserByName({
            fullName: value,
          })
          .then((user) => {
            if (user) {
              return Promise.reject("Username already in use");
            }
          });
      },
    },
  },
  email: {
    normalizeEmail: true,
    custom: {
      options: async (value) => {
        const user = await userRepository.getUser({
          email: value,
        });
        if (user) {
          return Promise.reject("Email address already taken");
        }
      },
    },
  },
  password: {
    isStrongPassword: {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
    },
    errorMessage:
      "Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
  },
};

const schemas = {
  registrationSchema,
};

module.exports = schemas;
