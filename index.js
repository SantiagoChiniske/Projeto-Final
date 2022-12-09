const express = require("express")
const app = express()
const handlebars = require('express-handlebars')
const bodyParser =require('body-parser')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Usuario = require('./Models/Usuario')
const Reserva= require('./Models/Reserva')
const { application } = require("express")




// Config
    //Template engine
    app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}));
    app.set('views engine','handlebars')
    app.use(express.static("img"));
    app.use(express.static('public'))


    //Body parser
    app.use(bodyParser.urlencoded({extended:false}))
    app.use(bodyParser.json())

    



//rotas
app.get('/',function(req,res){
  res.sendFile(__dirname+'/src/index.html')
})

app.get('/reservar',function(req,res){
    res.render('reserva.handlebars')
  })

  app.get('/perfil',function(req,res){
    res.render('perfil.handlebars')
  })

  app.get('/home',function(req,res){
    Reserva.findAll({order: [['id','DESC']]}).then(function(reservas){
      res.render('home.handlebars',{reservas: reservas})
    })
})



  //rotas admin

  
  app.get('/login-admin',function(req,res){
    res.sendFile(__dirname+'/src/admin-login.html')
  })

  app.get('/admin',function(req,res){
    res.render('admin.handlebars')
  })

  app.get('/Cadastro-Pessoa',function(req,res){
    res.render('cadastro-pessoa.handlebars')
  })

  app.get('/Cadastro-Sala',function(req,res){

    res.render('cadastro-sala.handlebars')
  })

  app.get('/usuarios',function(req,res){
    Usuario.findAll({order: [['id','ASC']]}).then(function(usuarios){
      res.render('usuarios.handlebars',{usuarios: usuarios})
    })
}) 



//Rotas de Cadastro e Delete

  app.post('/cadastropessoa', function(req,res){

    Usuario.create({
      name: req.body.nomeusuario,
      user: req.body.user,
      password: req.body.senha,
      cargo: req.body.cargo
  })
  if(req.body.user === req.body ){
    console.log("Usuario ja existente")
  }else{
    console.log("Usuario Cadastrado")
    res.redirect('/admin')
  }

  
})

  /* 
  .then(function(){
      
  }).catch(function(erro){
      res.send("Houve um erro"+erro)
  })
  */

  app.post('/reservasala',function(req,res){
    Reserva.create({
        nome: req.body.nomereserva,
        sala: req.body.salas,
        data: req.body.date,
        horarioentrada: req.body.horaentrada,
        horariosaida: req.body.horasaida
    }).then(function(){
        console.log("Reserva Cadastrada")
        res.redirect('/home')
    }).catch(function(erro){
        res.send("Houve um erro"+erro)
    })
  })


  app.post('/login', function (req, res) {

    if(req.body.password ===  req.body.senha   && req.body.user === req.body.user ){

      res.redirect('/home')
    }
    
});

app.post('/login-admin', function (req, res) {

  if(req.body.password ===  req.body.senha   && req.body.user === req.body.user ){
    res.redirect('/admin')
  }
  
});


  app.get('/deletar/:id',function (req,res){
    Reserva.destroy({
      where: {'id': req.params.id}
    }).then(function(){
      console.log("Reserva Excluida");
      res.redirect('/home')
    }).catch(function(erro){
      res.send("Reserva nao apagada com sucesso"+erro)
    })
   })

   app.get('/deletar-usuario/:id',function (req,res){
    Usuario.destroy({
      where: {'id': req.params.id}
    }).then(function(){
      console.log("Funcionario Excluida");
      res.redirect('/usuarios')
    }).catch(function(erro){
      res.send("Reserva nao apagada com sucesso"+erro)
    })
   })

   //Servidor Rodando nessa porta
    app.listen(8081, function(){
      console.log("Servidor rodando na url http://localhost:8081")
  });