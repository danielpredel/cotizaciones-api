const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

// Cypher Password
const cypherPassword = (password) => {
  return bcrypt
    .genSalt(saltRounds)
    .then((salt) => bcrypt.hash(password, salt))
    .then((hash) => {
      return hash;
    })
    .catch((err) => {
      throw new Error(
        "An error ocurred while hashing the password: " + err.message
      );
    });
};

// Compare Password
const comparePassword = (password, hash) => {
  return bcrypt.compare(password, hash);
};

// Create Token
const createToken = (id, correo, rol) => {
  const options = {
    expiresIn: "4h",
  };

  const token = jwt.sign({ id, correo, rol }, process.env.SECRET_KEY, options);
  return token;
};

// Validate token
const validateToken = (token) => {
  return jwt.verify(token, process.env.SECRET_KEY);
};

module.exports = {
  cypherPassword,
  comparePassword,
  createToken,
  validateToken,
};
