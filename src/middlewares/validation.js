const { body, validationResult } = require("express-validator");
const { checkEmail, checkRFC } = require("../services/clientes");

// Users
const nuevoCliente = [
  body("nombre")
    .exists()
    .withMessage("El nombre es requerido")
    .isString()
    .withMessage("El nombre debe ser texto"),
  body("apellidoP")
    .exists()
    .withMessage("El apellido paterno es requerido")
    .isString()
    .withMessage("El apellido paterno debe ser texto"),
  body("apellidoM")
    .isString()
    .withMessage("El apellido materno debe ser texto"),
  body("rfc")
    .exists()
    .withMessage("El RFC es requerido")
    .isString()
    .withMessage("El RFC debe ser texto")
    .custom((value) => {
      return checkRFC(value)
        .then((user) => {
          if (!user) {
            return true;
          }
          return Promise.reject("El RFC ya esta en uso");
        })
        .catch((err) => {
          return Promise.reject(
            "An error occurred while validating the RFC. Please try again later"
          );
        });
    })
    .withMessage("El RFC ya esta en uso"),
  body("correo")
    .exists()
    .withMessage("El correo es requerido")
    .isEmail()
    .withMessage("La direccion de correo debe ser valida")
    .custom((value) => {
      return checkEmail(value)
        .then((found) => {
          if (!found) {
            return true;
          }
          return Promise.reject("El correo ya esta en uso");
        })
        .catch((err) => {
          return Promise.reject(
            "An error occurred while validating the email. Please try again later"
          );
        });
    })
    .withMessage("El correo ya esta en uso"),
  body("password")
    .exists()
    .withMessage("El password es requerido")
    .isString()
    .withMessage("El password debe ser string")
    .isLength({ min: 8 })
    .withMessage("El password debe contener almeno 8 caracteres"),
  body("edad")
    .exists()
    .withMessage("La edad es requerida")
    .isInt()
    .withMessage("La edad debe ser un entero"),
  body("telefono")
    .exists()
    .withMessage("El telefono es requerido")
    .isNumeric()
    .withMessage("El telefono debe ser un numero"),
];

// Login
const login = [
  body("email")
    .exists()
    .withMessage("The email is required")
    .isEmail()
    .withMessage("The email address must be valid")
    .custom((value) => {
      const domain = value.split("@")[1]?.toLowerCase();
      const allowedDomains = ["gmail.com", "outlook.com"];
      return allowedDomains.includes(domain);
    })
    .withMessage("The email domain must be google.com or outlook.com"),
  body("password")
    .exists()
    .withMessage("The password is required")
    .isString()
    .withMessage("The password must be a string"),
];

// Ambos
const errors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
      message: "Los datos contienen errores",
    });
  }
  next();
};

module.exports = {
  nuevoCliente,
  errors,
  login,
};
