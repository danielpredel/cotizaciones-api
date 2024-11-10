const express = require("express");
const validationMiddleware = require("../middlewares/validation");
const clienteController = require("../controllers/clientes");
const router = express.Router();

// Registro de Cliente
router.post(
  "/",
  validationMiddleware.nuevoCliente,
  validationMiddleware.errors,
  clienteController.crearCliente
);

module.exports = router;