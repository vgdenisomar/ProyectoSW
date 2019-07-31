const express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;


function ProductsInit(db){


var  ProductsColl = db.collection('products');

var ProductsCollection = [];

var ProductsStruct = {
  "nombre_Product":'',
  "descripcion": '',
  "Precio_Original":0,
  "Precio_Oferta":0,
  "Cantidad_Producto":0,
  "Fecha_Vencimiento_Prod":Date
};





router.get('/', (req, res, next)=>{
  var id = new ObjectID(req.params.id);
  ProductsColl.find().toArray((err, things)=>{
    if(err) return res.status(200).json([]);
    return res.status(200).json(things);
  });
});

  router.get('/page', (req, res, next) => {
    getProducts(1, 50, res);
  });

  router.get('/page/:p/:n', (req, res, next) => {
    var by = { "by._id": new ObjectID(req.user._id) };
    var page = parseInt(req.params.p);
    var items = parseInt(req.params.n);
    getProducts(page, items, res);
  });

  function getProducts(page, items, res) {
    var query = {};
    var options = {
      "limit": items,
      "skip":((page-1) * items),
      "projection":{
        "descripcion":1
      }
    };
    ProductsColl.find(query,options).toArray((err, things) => {
      if (err) return res.status(200).json([]);
      return res.status(200).json({ things, totalThings});
    });
  }


router.get('/:id', (req, res, next)=>{
  var query = {"_id": new ObjectID(req.params.id)}
  ProductsColl.findOne(query, (err, doc)=>{
    if(err) {
      console.log(err);
      return res.status(401).json({"error":"Error al extraer documento"});
    }
    return res.status(200).json(doc);
  });
});

router.post('/', (req, res, next)=>{
  console.log(req.body); 
  var {_id, email} = req.user;
  var newElement = Object.assign({},
    ProductsStruct,
    req.body,
  );

  ProductsColl.insertOne(newElement, {} , (err, result)=>{
    if(err){
      console.log(err);
      return res.status(404).json({"error":"No se pudo Insertar One Thing"});
    }
    return res.status(200).json({"n": result.insertedCount,"obj": result.ops[0]});
  });
});



router.put('/:idElemento', (req, res, next) => {
  var query = {"_id": new ObjectID(req.params.idElemento)};
  var update = { "$set": req.body, "$inc":{"visited": 1}};
  ProductsColl.updateOne(query, update, (err, rst) => {
    if(err){
      console.log(err);
      return res.status(400).json({"error": "Error al actualizar documento"});
    }
    return res.status(200).json(rst);
  });

});


router.delete('/:id', (req, res, next) => {
  var query = {"_id": new ObjectID(req.params.id)}
  ProductsColl.removeOne(query, (err, result) => {
    if(err) {
      console.log(err);
      return res.status(400).json({"error":"Error al eliminar documento"});
    }
    return res.status(200).json(result);
  });
});

 return router;
}
module.exports = ProductsInit;
