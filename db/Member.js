const Sequelize = require('sequelize');

const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/lifetime_members_club_db');

const { STRING, UUID, UUIDV4 } = Sequelize; 

const Member = conn.define('Member', {
    id: {
        type:UUID, 
        primaryKey:true, 
        defaultValue: UUIDV4
    }, 
    name: {
        type: STRING
    }
});

console.log('found members module ')

module.exports = {
    Member
}