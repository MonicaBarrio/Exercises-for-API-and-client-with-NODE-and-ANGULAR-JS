// inicio======================================================================
var express = require('express');
var app = express(); 						// creamos la aplicacion con express
var mongoose = require('mongoose'); 				// utilizamos mongo para la BD
var port = process.env.PORT || 8080; 				// configuramos el puerto
var database = require('./config/database'); 			// carga la configuracion de la BD
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// configuracion ===============================================================
mongoose.connect(database.localUrl); 	// conecta la instancia local de Mongo DB. 

app.use(express.static('./public')); 		// especificas la ruta a la carpeta publica
app.use(morgan('dev')); // se registra cada llamada en la consola
app.use(bodyParser.urlencoded({'extended': 'true'})); 
app.use(bodyParser.json()); 
app.use(bodyParser.json({type: 'application/vnd.api+json'})); 
app.use(methodOverride('X-HTTP-Method-Override')); 


// rutas ======================================================================
require('./app/routes.js')(app);

// inicio de la app  ==========================================================
app.listen(port);
console.log("App listening on port " + port);
