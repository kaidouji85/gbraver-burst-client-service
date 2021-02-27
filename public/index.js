window.addEventListener('load', () => {
  const form = document.getElementById('form');
  const sendMessage = document.getElementById("message");
  const echoResponses = document.getElementById("eho-responses");
  const socket = io();

  form.addEventListener("submit", e => {
    e.preventDefault();
    e.stopPropagation();
    socket.emit('echo', sendMessage.value);
  })

  socket.on('echoResp', message => {
    const origin = String(message);
    const li = document.createElement('li');
    li.textContent = origin
    echoResponses.appendChild(li);

    sendMessage.value = '';
  });
});