const axios = require('axios');
// const message = require('../models/Invitation');
const { addWeddingInvitation } = require('../services/weddingInvitationService')

// const WAHA_API_BASE_URL = 'http://149.28.155.78:3000/api';
const WAHA_API_BASE_URL = 'http://localhost:3001/api';

const getSessions = async (req, res) => {
    try {
        const { all } = req.query;
        const url = all ? `${WAHA_API_BASE_URL}/sessions?all=${all}` : `${WAHA_API_BASE_URL}/sessions`;
        const response = await axios.get(url);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response ? error.response.status: 500).send(error.response ? error.response.data : error.message);
    }
};

const addInvitation = async (req, res) => {
    try {
        console.log('Received invitation data:', req.body);
        await addWeddingInvitation(req.body);
        res.status(200).send('Undangan berhasil disimpan');
    } catch (error) {
        console.error('Error adding wedding invitation:', error);
        res.status(500).send('Gagal menyimpan undangan');
    }
};


module.exports = {
    getSessions,
    addInvitation,
};
