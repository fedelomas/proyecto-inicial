"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

const port = 3900;

var url = "mongodb://localhost:27017/api_rest_reactnotas";

mongoose.Promise = global.Promise;

var article_routes = require("./routes/article");

//cargarmos body-parser, es un middleware para analizar cuerpos a travez de URL
app.use(bodyParser.urlencoded({ extended: false }));

//cualquier peticion la convertimos a formato json:
app.use(bodyParser.json());

//activamos el CORS para permitir las peticions AJAS Y HTTP desde el frontend
app.use((req, res, next) => {
  res.header("Acces-Control-Allow-Origin", "*");
  res.header(
    "Acces-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Acces-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.use("/api", article_routes);

mongoose.connect(url, { useNewUrlParser: true }).then(() => {
  console.log("conexion a la bdd realizada con exito!!");
  app.listen(port, () => {
    console.log("lanzando la aplicacion en el puerto " + port);
  });
})
