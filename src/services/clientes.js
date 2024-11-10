const db = require("../configs/db");
const { cypherPassword, createToken } = require("../utils/auth");

const crearCliente = (
  nombre,
  apellidoP,
  apellidoM,
  rfc,
  correo,
  password,
  edad,
  telefono
) => {
  return cypherPassword(password)
    .then(async (hash) => {
      const sql = `INSERT INTO Cliente (nombreCli, apellidoPaternoCli, apellidoMaternoCli, 
            RFCCLI, correoCli, passwordCli, edadCli, telefonoCli, fechaAltaCli) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())`;
      const values = [
        nombre,
        apellidoP,
        apellidoM,
        rfc,
        correo,
        hash,
        edad,
        telefono,
      ];

      try {
        const [result] = await db.query(sql, values);
        return { id: result.insertId, correo }; // Devuelve el ID del usuario insertado y el correo
      } catch (err) {
        throw new Error(
          "Error al insertar el cliente en la base de datos: " + err
        );
      }
    })
    .then((cliente) => {
      const token = createToken(cliente.id, cliente.correo, 'CLIENTE');
      return {
        token,
      };
    })
    .catch((err) => {
      throw new Error("An error ocurred while creating a new user: " + err);
    });
};

const checkEmail = async (correo) => {
  const sql = "SELECT idCli FROM Cliente WHERE correoCli = ?";
  const [rows] = await db.query(sql, [correo]);
  return rows.length > 0 ? true : false;
};

const checkRFC = async (rfc) => {
  const sql = "SELECT idCli FROM Cliente WHERE RFCCli = ?";
  const [rows] = await db.query(sql, [rfc]);
  return rows.length > 0 ? true : false;
};

module.exports = {
  crearCliente,
  checkEmail,
  checkRFC,
};
