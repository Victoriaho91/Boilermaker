const { db } = require('./db');
const app = require('./index');


const PORT = process.env.PORT || 8080;

if (process.env.NODE_ENV === 'development') {
  require('./secrets'); // this will mutate the process.env object with your secrets.
}


// Remember that if you pass the force: true option to sync, that will drop all of your tables before re-creating them. Be sure to never do this in production!

db.sync()  // sync our database
  .then(function(){
    app.listen(PORT) // then start listening with our express server once we have synced
  })

