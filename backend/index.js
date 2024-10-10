const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const mysql = require("mysql2/promise");

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
}));

app.get("/", (req, res) => {
  res.send("API Mascotas");
});

app.get("/mascotas", async (req, res) => {
  onGETMascotas(res);
});

async function mysqlConnection() {
  try {
    return await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '12341234',
      database: 'animales'
    });
  } catch (error) {
    throw new Error(`Error al conectar a la base de datos: ${error.message}`);
  }
}

async function getMascotas() {
  try {
    const connection = await mysqlConnection();
    const [results] = await connection.query('SELECT * FROM mascotas');
    connection.end();
    return results;
  } catch (error) {
    throw new Error(`Error al obtener las mascotas: ${error.message}`);
  }
}

async function onGETMascotas(res) {
  try {
    const mascotas = await getMascotas();
    res.json(mascotas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

app.listen(port, () => {
  console.log(`Sandbox listening on port ${port}`);
});
