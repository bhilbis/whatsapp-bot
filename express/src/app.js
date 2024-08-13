const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const wahaController = require('./controllers/wahaController');
const webhookController = require('./controllers/webhookController');
const expressWs = require('express-ws');
const invitationService = require('./services/invitationService');
const weddingInvitationService = require('./services/weddingInvitationService');

const cors = require('cors');

const app = express();
expressWs(app);

app.use(express.json());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')));
app.use(cors({
    origin: 'http://localhost:4200'
}));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/sendMessage', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'sendMessage.html'));
})

//Web Socket
app.ws('/websocket', (ws, req) => {
    console.log('WebSocket connection established');
    ws.on('close', () => {
        console.log('WebSocket connection closed');
    });
    webhookController.addClient(ws)
})
//webhook
app.post('/webhook', webhookController.handleWebhook)
app.get('/api/webhook-messages', webhookController.getWebhookMessages)

//sessions
app.get('/api/sessions', wahaController.getSessions);
app.post('/api/addInvitation', wahaController.addInvitation)

//API
app.get('/api/messages', async (req, res) => {
    try {
        const messages = await invitationService.getMessage();
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch messages' })
    }
});

app.get('/api/messages/:sender/:receiver', async (req, res) => {
    const { sender, receiver } = req.params;
    try {
        const message = await invitationService.findMessageBySenderAndReceiver(sender, receiver);
        if (message) {
            res.json(message);
        } else {
            res.status(404).json({ errro: 'Message not found'})
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch message'});
    }
})

app.get('/api/wedding-invitations', async (req, res) => {
    try {
        const invitations = await weddingInvitationService.getAllInvitations();
        res.json(invitations)
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch wedding invitations'})
    }
})

app.get('/api/wedding-invitations/:id', async (req, res) => {
    const { id_wedding } = req.params;
    try {
        const invitation = await weddingInvitationService.getInvitationById(id_wedding);
        if (invitation) {
            res.json(invitation);
        } else {
            res.status(404).json({ error: 'wedding invitation not found'})
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch wedding invitation'})
    }
})

app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        console.error('Bad Json:', err.message);
        return res.status(400).send({ status: 400, message: 'Bad Json' });
    }
    next();
});

const port = 3000;
app.listen(port, () =>{
    console.log(`Server running at http://localhost:${port}/`);
});