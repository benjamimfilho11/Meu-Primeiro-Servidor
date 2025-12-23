const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Produto = require("./models/Produtos");

//Configurar BodyParser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.post("/cadastro",function(req,res){
    Produto.create({
        nome: req.body.nome,
        preco: req.body.preco,
        descricao: req.body.descricao
    }).then(function(){
        res.send("Produto cadastrado com sucesso!");
    }).catch(function(erro){
        res.send("Erro ao cadastrar o produto!"+ erro)
    });
});


app.get("/",function(req,res){
    Produto.findAll().then(function(produtos){
        res.send({produtos: produtos})
    }).catch(function(erro){
        res.send("Erro ao buscar os dados" + erro);
    })
});

app.get("/:nome",function(req,res){
    Produto.findAll({where: {"nome": req.params.nome}}).then(function(produto){
        res.send(produto)
        res.send("Consulta Realizada com Sucesso!")
    }).catch(function(erro){
        res.send("Produto não existe na base de dados" + erro)
    })
});

app.patch("/atualizar/:id",function(req,res){
    Produto.update({
        nome: req.body.nome,
        preco: req.body.preco,
        descricao: req.body.descricao},
        {where: {"id": req.params.id}}
    ).then(function(){
        res.send("Sucesso ao atualizar os dados do Produto!");
    }).catch(function(erro){
        res.send("Erro ao atualizar os dados do Produto!" + erro)
    });
});

app.delete("/delete/:id",function(req,res){
    Produto.destroy({where: {"id":req.params.id}}).then(function(){
        res.send("Produto Deletado com Sucesso!")
    }).catch(function(erro){
        res.send("Erro ao deletar produto" + erro);
    });
})

const PORT = process.env.PORT || 8081;
app.listen(PORT,"0.0.0.0", () => {
  console.log("Servidor está rodando em http://localhost:8081");
});
