const pool = require("../db/connection");

async function customerRegistration(req, res, next) {
  const { firstName, lastName, address, postCode, mobile } = req.body;
  try {
    const dbres = await pool.query(
      "INSERT INTO customers (firstName, lastName,address, postCode, mobile) VALUES($1,$2,$3,$4,$5)",
      [firstName, lastName, address, postCode, mobile]
    );
    if (dbres.rowCount) {
      res.status(200).json({ message: "Customer registration successfull." });
    }
  } catch (error) {
    res.status(500).json({ message: error.detail });
  }
}

module.exports = { customerRegistration };
