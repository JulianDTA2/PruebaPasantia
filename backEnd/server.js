const path = require("path");
const express = require("express");
const app = express();
const productRoutes = require("./routes/productRoutes");

app.use(express.json());
app.use("/api/productos", productRoutes);
app.use(express.static(path.join(__dirname, "../frontend")));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Servidor listo en http://localhost:${PORT}`)
);
