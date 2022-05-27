const express = require('express');

const app = express();

const { setupDb, Member, Facility, Booking }  = require('./db');

app.get('/', (req, res) => res.redirect('/members'));



app.get('/facilities', async(req, res, next) => {
    try{
        const facilities = await Facility.findAll( { include: [ Booking ] });
        res.send(
            `
            <html>
            <head>
                <title> Booking </title> 
            </head>
                <body>
                    ${
                        facilities.map(facility => {
                            return `<div> ${JSON.stringify(facility)} </div> `
                        })
                    }
                </body>
            </html>
            `
        );
}   
catch(ex){
    console.log(ex)
}
});

app.get('/bookings', async(req, res, next) => {
    try{
        const bookings = await Booking.findAll({
            include: [{model: Member, as : 'booker'}, 
            Facility
        ]
        });
        res.send(
            `
            <html>
            <head>
                <title> Booking </title> 
            </head>
                <body>
                    ${
                        bookings.map(booking => {
                            return `<div> ${JSON.stringify(booking)} </div> `
                        }).join('')
                    }
                </body>
            </html>
            `
        )
    }
    catch(ex){
        console.log(ex)
    }
});






const init = async() => {
    try{
        await setupDb()
        console.log('database seeded!!')
        // const port = process.env.PORT || 3000;
        // app.listen(port, () => console.log(`listening on PORT: ${port}`));
           
    }
    catch(ex){
        console.log(ex)
    }
}; 

init()


