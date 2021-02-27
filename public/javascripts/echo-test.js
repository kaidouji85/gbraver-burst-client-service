window.addEventListener('load', () => {
  const socket = io();

  socket.on('echoResp', message => {
    const origin = String(message);
    console.log(origin);
  });

  socket.emit('echo', 'hello');
});