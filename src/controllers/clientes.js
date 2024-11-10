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

module.exports = {
  crearCliente,
};
