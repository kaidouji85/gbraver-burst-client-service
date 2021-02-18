// @flow
import {app} from '../app';
import Debug from 'debug';
import http from 'http';

const debug = Debug('gbraver-burst-client-service:server');

const port = getPortFromEnv() ?? getNamedPipeFromEnv() ?? 3000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * 環境変数からポート番号を取得する
 * 正しいポート番号を取得できない場合はnullを返す
 *
 * @return 取得結果
 */
function getPortFromEnv(): number | null {
  const port = parseInt(process.env.PORT, 10);
  const isValidPort = !isNaN(port) && (0 <= port);
  if (isValidPort) {
    return port;
  }

  return null;
}

/**
 * 環境変数から名前付きパイプを取得する
 * 正しい名前付きパイプを取得できない場合はnullを返す
 *
 * @return 取得結果
 */
function getNamedPipeFromEnv(): string | null {
  const namedPipe: string = process.env.PORT ?? '';
  const isValidNamedPipe = namedPipe !== '';
  if (isValidNamedPipe) {
    return namedPipe;
  }

  return null;
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
