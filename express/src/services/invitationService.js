const sequelize = require('../config/database')

const addMessage = async ({ message, date_sent, date_read, date_receive, status, receiver_number, sender_number }) => {
  try {
    const [results, metadata] = await sequelize.query(
      `INSERT INTO message (message, date_sent, date_read, date_receive, status, receiver_number, sender_number) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      {
        replacements: [message, date_sent, date_read, date_receive, status, receiver_number, sender_number],
      }
    );
    console.log('New invitation added');
    return metadata.insertId;
  } catch (error) {
    console.error('Error adding invitation:', error);
  }
};

const findMessageBySenderAndReceiver = async (sender_number, receiver_number, message) => {
  try {
    const [results] = await sequelize.query(
      'SELECT * FROM message WHERE sender_number = ? AND receiver_number = ? AND message = ?',
      {
        replacements: [sender_number, receiver_number, message],
      }
    );
    return results.length > 0 ? results[0] : null;
  } catch (error) {
    console.error('Error finding message:', error);
    return null;
  }
};

const getAttendanceStatus = async (receiverNumber) => {
  try {
    const [results] = await sequelize.query (
      'SELECT * FROM message WHERE receiver_number = ? AND status IN (?, ?) ORDER BY date_receive DESC LIMIT 1',
      {
        replacements: [receiverNumber, 'attendance', 'non-attendance'],
        type: sequelize.QueryTypes.SELECT,
      }
    );
    return results ? results : null;
  } catch (error) {
    console.error('Error fetching attendance status', error);
    throw error;
  }
};

const updateMessageStatus = async (id_wedding, newStatus) => {
  if (!id_wedding || !newStatus) {
    console.error('Invalid id or status provided for update');
    return;
  }

  console.log('Updating status for ID:', id_wedding); 

  try {
    const [results, metadata] = await sequelize.query(
      'UPDATE message SET status = ? WHERE id_wedding = ?',
      {
        replacements: [newStatus, id_wedding],
      }
    );

    if (metadata.affectedRows > 0) {
      console.log(`Invitation status updated to ${newStatus} for id ${id_wedding}`);
    } else {
      console.log(`No rows affected. Check if id ${id_wedding} exists.`);
    }
  } catch (error) {
    console.error('Error updating invitation status:', error);
  }
};

const getMessage = async () => {
  try {
    const [results] = await sequelize.query('SELECT * FROM message');
    return results;
  } catch (error) {
    console.error('Error fetching invitations:', error);
  }
};


const deleteConfirmation = async (receiver_number) => {
  try {
    const query = `DELETE FROM message WHERE receiver_number = ? AND status IN ('attendance', 'non-attendance')`;
    await sequelize.query(query, {
      replacements: [receiver_number],
      type: sequelize.QueryTypes.DELETE,
    });
    console.log('Confirmation Deleted');
  } catch (error) {
    console.error('Error deleting confirmation from database:', error.message);
    throw error;
  }
};

module.exports = {
  addMessage,
  updateMessageStatus,
  getAttendanceStatus,
  getMessage,
  deleteConfirmation,
  findMessageBySenderAndReceiver,
};
