const db = require('./db')

const  Reserva =db.sequelize.define('reservas',{
    nome:{
        type: db.Sequelize.STRING
    },
    sala:{
        type: db.Sequelize.STRING
    },
    data:{
        type: db.Sequelize.DATE
    },
    horarioentrada:{
        type: db.Sequelize.TIME
    },
    horariosaida:{
        type: db.Sequelize.TIME
    }
})

module.exports = Reserva

//Reserva.sync({force:true})

