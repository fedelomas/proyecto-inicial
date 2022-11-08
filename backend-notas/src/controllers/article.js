"use strict";

var Article = require("../models/article");

// creamos un objeto para disponer de todos los metodos de ruta que definimos

var controller = {
  //metodo para guardar un articulo
  save: (req, res) => {
    var params = req.body;

    var article = new Article();
    //asignamos los valores
    article.title = params.title;
    article.content = params.content;
    article.author = params.author;
    // guardamos el articulo
    article.save((err, articleStored) => {
      if (err || !articleStored) {
        return res.status(404).send({
          status: "error",
          message: " El articulo no se ha guardado",
        });
      }

      return res.status(200).send({
        status: "succes",
        articleStored,
      });
    });
  },

  //metodo para listar los articulos
  getArticles: (req, res) => {
    var query = Article.find({});

    query.sort("-date").exec((err, articles) => {
      if (err) {
        return res.status(500).send({
          status: "error",
          message: "Error al extraer los datos",
        });
      }
      if (!articles) {
        return res.status(404).send({
          status: "error",
          massage: "no hay articulos para mostrar",
        });
      }
      return res.status(200).send({
        status: "succes",
        articles,
      });
    });
  },

  // metodo para eliminar un articulo
  delete: (req, res) => {
    //recoger el id a traves de la url
    var articleId = req.params.id;

    Article.findOneAndDelete({ _id: articleId }, (err, articleRemoved) => {
      if (err) {
        return res.status(500).send({
          status: "error",
          message: "error al eliminar el articulo",
        });
      }
      if (!articleRemoved) {
        return res.status(404).send({
          status: "error",
          message: "no se ha encontrado el articulo a eliminar",
        });
      }
      return res.status(200).send({
        status: "success",
        article: articleRemoved,
      });
    });
  },
};

module.exports = controller;
