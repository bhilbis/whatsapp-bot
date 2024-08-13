const socket = new WebSocket('ws://localhost:3000/websocket');

socket.onopen = () => {
    console.log('WebSocket connection established');
};

socket.onmessage = (event) => {
    const messageData = JSON.parse(event.data);
    console.log('New message received:', messageData);
};

socket.onclose = () => {
    console.log('WebSocket connection closed');
};

socket.onerror = (error) => {
    console.error('WebSocket error:', error);
};

const sendMessage = (chatId, text, session) => {
    const message = {
        chatId: chatId,
        text: text,
        session: session,
    };
    socket.send(JSON.stringify(message));
};
