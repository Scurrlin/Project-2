const mongoose = require('mongoose');

// movies is the name of the db, it will either connect to a movies database in mongodb
// or it will create a movies database in mongodb
mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;

// this will fire when mongoose (our express app)
// has established a connecction with mongodb on port 27017
db.on('connected', function(){
	console.log(`Mongoose connected to: $[db.host}:${db.port}`);
})