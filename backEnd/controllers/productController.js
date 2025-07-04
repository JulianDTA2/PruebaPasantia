const { pool, poolConnect, sql } = require("../db");

async function handle(res, fn) {
  try {
    await fn();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

// Listar activos
exports.listar = (req, res) =>
  handle(res, async () => {
    await poolConnect;
    const { recordset } = await pool
      .request()
      .query("SELECT * FROM productos WHERE activo = 1");
    res.json(recordset);
  });

// Obtener por ID
exports.obtener = (req, res) =>
  handle(res, async () => {
    const { id } = req.params;
    await poolConnect;
    const { recordset } = await pool
      .request()
      .input("id", sql.Int, id)
      .query("SELECT * FROM productos WHERE id = @id");
    if (!recordset.length)
      return res.status(404).json({ error: "No encontrado" });
    res.json(recordset[0]);
  });

// Crear
exports.crear = (req, res) =>
  handle(res, async () => {
    const { nombre, descripcion = "", precio } = req.body;
    await poolConnect;
    const { recordset } = await pool
      .request()
      .input("nombre", sql.NVarChar(100), nombre)
      .input("descripcion", sql.NVarChar(sql.MAX), descripcion)
      .input("precio", sql.Decimal(10, 2), precio)
      .query(`INSERT INTO productos(nombre, descripcion, precio)
            VALUES(@nombre, @descripcion, @precio);
            SELECT SCOPE_IDENTITY() AS id;`);
    res.status(201).json({ id: recordset[0].id });
  });

// Actualizar
exports.actualizar = (req, res) =>
  handle(res, async () => {
    const { id } = req.params;
    const { nombre, descripcion = "", precio } = req.body;
    await poolConnect;
    await pool
      .request()
      .input("id", sql.Int, id)
      .input("nombre", sql.NVarChar(100), nombre)
      .input("descripcion", sql.NVarChar(sql.MAX), descripcion)
      .input("precio", sql.Decimal(10, 2), precio).query(`UPDATE productos
            SET nombre=@nombre, descripcion=@descripcion, precio=@precio
            WHERE id=@id`);
    res.json({ message: "Actualizado" });
  });

// Soft delete
exports.eliminar = (req, res) =>
  handle(res, async () => {
    const { id } = req.params;
    await poolConnect;
    await pool
      .request()
      .input("id", sql.Int, id)
      .query("UPDATE productos SET activo = 0 WHERE id=@id");
    res.json({ message: "Eliminado" });
  });
