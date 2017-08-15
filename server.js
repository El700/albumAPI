var express = require('express')
var app = express()
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/tp8');
var bodyParser = require('body-parser');
var Album     = require('./models/album');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = 8080;


app.get('/albums', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  
    Album.find(function(err, albums) {
            if (err)
                res.send(err);

            res.json(albums);
        })
});

//app.post('/addalbums', function(req, res) {
//  res.setHeader('Content-Type', 'application/json');
//
//  Album.create({title: "Holly Rolling",mc: "El Mega", price: 2000}, function (err, small) {
//    if (err) res.send(err);
//    res.json({ message: 'Successfully added' });
//  })
//});

app.post('/albums', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  Album.create({title: req.body.title ,mc: req.body.mc ,price: req.body.price}, function (err, small) {
    if (err) console.log(err);
    res.json({ message: 'Successfully added' });
  })
});

app.patch('/albums/:id', function(req, res) {
 Album.findOneAndUpdate({
   _id: req.params.id   
   },
   { $set: { price: req.body.price}
 }, {upsert: true}, function(err, newAlbum) {
   if (err) {
     res.send('error updating ');
   } else {
     console.log(newAlbum);
     res.send(newAlbum);
   }
 });
});


app.listen(port);
