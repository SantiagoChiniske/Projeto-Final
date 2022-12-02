const db = require('./db')

const  Sala =db.sequelize.define('salas',{
    nome:{
        type: db.Sequelize.STRING
    },
})
//Sala.sync({force:true})