import express from "express";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";

const server = express();
const port = 8080;

server.use(express.json());

server.get("/", (req, res) => {
  res.send("API funcionando!");
});

// Rutas principales
server.use("/api/products", productsRouter);
server.use("/api/carts", cartsRouter);

server.listen(port, () => {
  console.log(`Servidor escuchando en puerto ${port}`);
});