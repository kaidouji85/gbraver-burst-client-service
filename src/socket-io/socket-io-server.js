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

  io.on('connection', socket => {
    socket.on('echo', message => {
      console.log('echo');
      const origin: string = String(message);
      const response = `echo of ${origin}`;
      socket.emit('echoResp', response);
    });
  });
  
  return io;
}