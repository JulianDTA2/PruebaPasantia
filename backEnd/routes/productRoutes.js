const { Router } = require("express");
const ctrl = require("../controllers/productController");

module.exports = Router()
  .get("/", ctrl.listar)
  .get("/:id", ctrl.obtener)
  .post("/", ctrl.crear)
  .put("/:id", ctrl.actualizar)
  .delete("/:id", ctrl.eliminar);
