/*
play this: https://www.youtube.com/watch?v=d-diB65scQU

Sing along:

here's a little code I wrote, you might want to read it really slow, don't worry be happy
in every line there may be trouble, but if you worry you make it double, don't worry, be happy
ain't got no sense of what is REST? just concentrate on learning Express, don't worry, be happy
your file is getting way too big, bring a Router and make it thin, don't worry, be crafty
there is no data on that route, just write some code, you'll sort it out… don't worry, just API…
I need this code, just don't know where, perhaps should make some middleware, don't worry, be happy

Go code!
*/

const express = require('express');
const aRouter = require('./data/helpers/actions/actionRouter')
const pRouter = require('./data/helpers/projects/projectsRouter')



const server = express();






server.get('/', (req, res) =>{
    res.send(`<h2>Hitting</h2>`)
});

function logger(req, res, next){
console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} ${req.get('Origin')}`);
  next();
}


server.use(logger)
server.use('/api/projects', pRouter, aRouter)

const port = 5000;

server.listen(port, () => console.log('Loggn'))

module.exports = server;
