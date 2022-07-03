const express = require('express'); 
const port = 3000; 
const bodyparser = require('body-parser'); 
const fs = require('fs');

// app express 
const app = express(); 
app.use(express.json())

// body parser 
app.use(bodyparser.urlencoded()); 


// use src from public
app.use(express.static(__dirname + "/public")); 

// simulando banco de dados

let banco = [ ];

fs.readFile("cadastro-formulario.json", "utf-8", (err, data) => {
    if (err) {
        console.log(err)
    } else { 
        banco = JSON.parse(data)
    }
})

app.get('/form', (req, res) => {
    res.sendFile(__dirname + "/public/index.html"); 
})

app.post('/cadastro', (req, res) => {
    const {nome, email} = req.body; 

    const cadastro = { nome, email }; 

    banco.push(cadastro);

    fs.writeFile("cadastro-formulario.json", JSON.stringify(banco), (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Foi adicoionado de forma correta!');
        }
    })

    res.send("<h1>Cadastrado com sucesso!</h1>");
})

app.listen(port, () => {
    console.log('Server Running');
}); 