const Sequelize = require('sequelize')

//Coneccao com o Banco de Dados
const sequelize = new Sequelize('reserva','root','password',{
    host: "localhost",
    dialect: 'mysql',
    query:{raw:true}
})

module.exports ={
    Sequelize: Sequelize,
    sequelize : sequelize
}

