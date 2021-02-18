// @flow
import {app} from '../app';
import Debug from 'debug';
import http from 'http';

const debug = Debug('gbraver-burst-client-service:server');

const port = getPortOrNamedPipe();
app.set('port', port);

const server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * 環境変数からポート、名前付きパイプを抽出する
 */
function getPortOrNamedPipe(): number | string {
  const defaultPort = 3000;

  const envValue: string = process.env.PORT ?? '';
  if (envValue === '') {
    return defaultPort;
  }

  const port = parseInt(envValue, 10);
  const isNamedPipe = isNaN(port);
  if (isNamedPipe) {
    return envValue;
  }

  const isValidPort = !isNaN(port) && (0 <= port);
  if (isValidPort) {
    return port;
  }

  return defaultPort;
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
