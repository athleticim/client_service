
const app = require('../app');
const http = require('http');


const port = normalizePort(process.env.PORT || '4002');

app.set('port', port);


const server = http.createServer(app);


server.listen(port);
server.on('error', onError);
server.on('listening', onListening);


function normalizePort(val) {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

function onError(error) {
  console.log('error occured: '+error);
  return error;
}

function onListening() {
  const addr=server.address();
  console.log('Listening on port '+ addr.port);
  return addr;
}

module.exports={
  onListening,
  onError,
  normalizePort,
};
