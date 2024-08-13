const sequelize = require('../config/database')

const addWeddingInvitation = async (invitationData) => {
    try {
        const { 
            chat_id,nama_laki_laki,
            nama_perempuan,
            hari_akad,
            tanggal_akad,
            waktu_mulai_akad,
            waktu_selesai_akad,
            lokasi_akad,
            hari_resepsi,
            tanggal_resepsi,
            waktu_mulai_resepsi,
            waktu_selesai_resepsi,
            lokasi_resepsi
          } = invitationData;

        const query = `
        INSERT INTO wedding_invitation ( 
            chat_id, nama_laki_laki, nama_perempuan, hari_akad, tanggal_akad, 
            waktu_mulai_akad, waktu_selesai_akad, lokasi_akad, hari_resepsi, 
            tanggal_resepsi, waktu_mulai_resepsi, waktu_selesai_resepsi, lokasi_resepsi) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        await sequelize.query(query, {
            replacements: [
                chat_id, nama_laki_laki, nama_perempuan, hari_akad, tanggal_akad,
                waktu_mulai_akad, waktu_selesai_akad, lokasi_akad, hari_resepsi,
                tanggal_resepsi, waktu_mulai_resepsi, waktu_selesai_resepsi, lokasi_resepsi
            ],
        });
        
        console.log("New wedding invitation added:", invitationData);
    } catch (error) {
        console.error("Error adding wedding invitation:", error);
        throw error;
    }
};

const getAllInvitations = async () => {
    try {
        const [results] = await sequelize.query('SELECT * FROM wedding_invitation');
        return results;
    } catch (error) {
        console.error('Error fetching wedding invitations:', error);
        throw error;
    }
}

const getInvitationById = async (id_wedding) => {
    try {
        const [results] = await sequelize.query('SELECT * FROM wedding_invitation WHERE id_wedding = ?', {
            replacements: [id_wedding],
            type: sequelize.QueryTypes.SELECT,
        });
        return results
    } catch (erorr) {
        console.error('Error fetching wedding invitation by ID', error); 
        throw error;
    }
}

const getWeddingInvitation = async (chat_id) => {
    try {
        const query = `
            SELECT * FROM wedding_invitation WHERE chat_id = $1
        `;

        console.log("Executing query:", query);
        console.log("With parameter:", chat_id);

        const [results] = await sequelize.query(query, {
            bind:[chat_id],
            type: sequelize.QueryTypes.SELECT,
        });

        console.log("Wedding invitation:", results);
        return results;
    } catch (error) {
        console.error("Error fetching wedding invitation:", error);
        throw error;
    }
};

module.exports = {
    addWeddingInvitation,
    getWeddingInvitation,
    getAllInvitations,
    getInvitationById,
};
