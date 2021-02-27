// @flow
import {app} from '../express/app';
import Debug from 'debug';
import http from 'http';

const debug = Debug('gbraver-burst:server');

const port = getPortFromEnv() ?? getNamedPipeFromEnv() ?? 3000;
app.set('port', port);

const httpServer = http.createServer(app);
httpServer.listen(port);
httpServer.on('error', onError);
httpServer.on('listening', onListening);

/**
 * 環境変数からポート番号を取得する
 * 正しいポート番号を取得できない場合はnullを返す
 *
 * @return 取得結果
 */
function getPortFromEnv(): number | null {
  const port = parseInt(process.env.PORT, 10);
  const isValidPort = !isNaN(port) && (0 <= port);
  return isValidPort ? port : null;
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
  return isValidNamedPipe ? namedPipe : null;
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
  var addr = httpServer.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
