const db = require('./db')

const Usuario = db.sequelize.define('usuarios', {
    id: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: db.Sequelize.STRING,
        allowNull: false,
    },
    user: {
        type: db.Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: db.Sequelize.STRING,
        allowNull: false,
    },
    cargo:{
        type: db.Sequelize.STRING
    }

});
//Usuario.sync({force:true})


module.exports = Usuario
