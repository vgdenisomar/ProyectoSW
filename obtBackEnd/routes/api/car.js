const express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;

function ProductsInit(db) {


    var ProductsColl = db.collection('car');

    var ProductsCollection = [];

    var ProductsStruct = {
        "codProd": '',
        "nombre_Product":'',
        "by": ''
    };

    router.get('/', (req, res, next) => {
        var { _id} = req.user;
        var query = {"by": new ObjectID(_id)}
        ProductsColl.find(query).toArray((err, things) => {
            if (err) return res.status(200).json([]);
            return res.status(200).json(things);
        });
    });

    router.post('/', (req, res, next) => {
        var { _id} = req.user;
        var newElement = Object.assign({},
            ProductsStruct,
            {
                "codProd":  new ObjectID(req.body.codProd),
                "nombre_Product":req.body.nombre_Product,
                "by": new ObjectID(_id),
            }
        );
        ProductsColl.insertOne(newElement, {}, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(404).json({ "error": "No se pudo Insertar One Thing" });
            }
            return res.status(200).json({ "n": result.insertedCount, "obj": result.ops[0] });
        });
    });

    router.delete('/:id', (req, res, next) => {
        var { _id} = req.user;
        var query = {"codProd":new ObjectID(req.params.id),"by": new ObjectID(_id)}
        ProductsColl.remove(query, (err, result) => {
          if(err) {
            console.log(err);
            return res.status(400).json({"error":"Error al eliminar documento"});
          }
          return res.status(200).json(result);
        });
        //var soft = req.params.soft;
        // thingsCollection = thingsCollection.filter( (e, i) => {
        //   return (e.id !== id );
        // } ); //
        // res.status(200).json({ 'msg': 'Elemento ' + id + ' fué eleminido!!!' });
      });// put /
      
    return router;
}
module.exports = ProductsInit;