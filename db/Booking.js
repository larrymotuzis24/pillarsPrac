const Sequelize = require('sequelize');

const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/lifetime_members_club_db');

const { STRING, UUID, UUIDV4 } = Sequelize; 

const Booking = conn.define('Booking', {
    id: {
        type: UUID,
         primaryKey: true,
         defaultValue: UUIDV4
    }
});


module.exports = Booking