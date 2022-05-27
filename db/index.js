const Sequelize = require('sequelize');

const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/lifetime_members_club_db');

const { STRING, UUID, UUIDV4 } = Sequelize; 

const { Member } = require('./Member');

const Facility = require('./Facility');

const Booking = require('./Booking');


Booking.belongsTo(Facility);
Facility.hasMany(Booking);

Booking.belongsTo(Member, {as : 'booker'});

const setupDb = async() => {
    try{
        await conn.sync({ force:true });
        
        const [Tiger, Dustin, John ] = await Promise.all(
            ['Tiger', 'Dustin', 'John'].map(name => {
               return Member.create({ name })
            })
        );

        const [ bball, pool, tennis ] = await Promise.all(
            [ 'bball', 'pool', 'tennis'].map(name => Facility.create({ name:name }))
        );
        await Promise.all([
            Booking.create({FacilityId: bball.id, bookerId: Tiger.id}),
            Booking.create({FacilityId: pool.id, bookerId: Dustin.id}),
            Booking.create({FacilityId: tennis.id, bookerId: John.id})
        ])
        
    }
    catch(ex){
        console.log(ex)
    }
}; 

module.exports = {
    setupDb,
    Member,
    Facility,
    Booking
}


