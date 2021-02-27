// @flow
import Debug from 'debug';
import http from 'http';
import type {$Application, $Request, $Response} from "express";
import {getServerPort} from "./port";

const debug = Debug('gbraver-burst:server');
const port = getServerPort();

/**
 * expressが利用するHTTPサーバを生成する
 *
 * @param app expressアプリケーション
 * @return 生成結果
 */
export function expressHttpServer(app: $Application<$Request, $Response>): http.Server {
  app.set('port', port);

  const server = http.createServer(app);
  server.listen(port);
  server.on('error', onError);
  server.on('listening', () => {
    onListening(server.address());
  });
  return server;
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
 * リスニング イベントハンドラ
 *
 * @param address HTTPサーバのアドレス
 */
function onListening(address) {
  const bind = typeof address === 'string'
    ? 'pipe ' + address
    : 'port ' + address.port;
  debug('Listening on ' + bind);
}
