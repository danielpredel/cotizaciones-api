const clienteService = require("../services/clientes");

const crearCliente = (req, res) => {
  const {
    nombre,
    apellidoP,
    apellidoM,
    rfc,
    correo,
    password,
    edad,
    telefono,
  } = req.body;
  clienteService
    .crearCliente(
      nombre,
      apellidoP,
      apellidoM,
      rfc,
      correo,
      password,
      edad,
      telefono
    )
    .then((user) => {
      res.status(201).json({
        success: true,
        user,
        message: "New user created successfully",
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        errors: err.message,
        message: "Something went wrong while creating the user",
      });
    });
};

const checkEmail = (req, res) => {
  const { email } = req.query;
  clienteService
    .checkEmail(email)
    .then((found) => {
      res.status(200).json({
        success: true,
        available: !found,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
      });
    });
};

const checkRFC = (req, res) => {
  const { rfc } = req.query;
  clienteService
    .checkRFC(rfc)
    .then((found) => {
      res.status(200).json({
        success: true,
        available: !found,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
      });
    });
};

module.exports = {
  crearCliente,
  checkEmail,
  checkRFC,
};
