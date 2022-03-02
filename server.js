require("dotenv").config();
const express = require("express");
const { getData } = require("./controllers/controllers");
const cors = require("cors");
const { createConnection } = require("./database");

createConnection();

const app = express();
// const router = app.router()

// router.post('/api/products', controller)

// Middlewares para habilitar recepción de JSONs
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Importamos las rutas
app.get("/", (req, res) => {
  res.json({ message: "API running..." });
});

app.get("/api/products", getData);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`server running in the port  ${PORT}`));
