// @flow

import SocketIO from 'socket.io';
import {Server} from 'http';

/**
 * socket.ioサーバを生成する
 *
 * @param httpServer httpサーバ
 * @return 生成結果
 */
export function socketIOServer(httpServer: Server): SocketIO$Server {
  const io = SocketIO(httpServer);
  return io;
}