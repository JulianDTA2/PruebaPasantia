require("dotenv").config();
const sql = require("mssql");

// Lee variables de entorno o usa valores por defecto
const config = {
  server: process.env.DB_SERVER || "JULIDEV",
  database: process.env.DB_NAME,
  port: +process.env.DB_PORT,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
  authentication: {
    type: "ntlm", // ← Windows Integrated Security
    options: { domain: "", userName: "", password: "" },
  },
};

const pool = new sql.ConnectionPool(config);
const poolConnect = pool.connect().catch((err) => {
  console.error("Conexión a SQL Server fallida:", err.message);
});

module.exports = { sql, pool, poolConnect };
