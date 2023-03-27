require('express-async-errors');
require("dotenv/config")

const migrationsRun = require("./database/sqlite/migrations")
/* Antes, eu estava apenas puxando a função de execução do sql, agora, criei uam função em migrations/index.js
que está criando uma string com toda a estrutura SQL da tabela, junto com a utilização da biblioteca SQlite, para assim,
ao executar essa função "migrationsRun", possa-se automatizar a criação, tanto do banco em si, quanto as tabelas já com 
suas configurações e estruturas a partir do JS */

const AppError = require('./utils/AppError')
const express = require("express");
const app = express();
const routes = require("./routes");
const uploadConfig = require("./configs/upload")
const cors = require("cors")


migrationsRun(); // diferente da migration do knex, esta do sqlite(utilizada para criar usuários) está sendo executada
//direto, sem precisar dar comandos

app.use(express.json());//especificando que o corpo da requisição no express vai trabalhar em json
app.use(cors());
app.use(routes);
app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER))


app.use((error, request, response, next) => {
    if (error instanceof AppError) {
        return response.status(error.statusCode).json({
            // error assume valor de AppError, que está sendo disparado pela condição de não ter nome em usersControllers.
            //instanceof confere se existe um construtor dentro de AppError, e de alguma forma 'error' assume o objeto.
            status: 'error',
            message: error.message
        })
    }
    if (response.status(500)) {
        console.log(error)
    }
    return response.status(500).json({
        status: "error",
        message: "Internal server error",
        /* na linha de código acima "app.use(routes)", route tem um "use" que está fazendo "post", por meio de uma função dentro
        da classe passada dentro de seus parametros, caso qualquer coisa esteja errada no código dessa classe, seja, a captura do 
        body, com req, ou a resposta com res, a linha de código app.use(routes) vai passar pra frente a aplicação, e assim, já
        se dispara esse erro aqui,automaticamente.*/

    })

});

const PORT = process.env.PORT || 3333;
app.listen(PORT, () =>
    console.log(`Server is running on PORT ${PORT}`));

// definindo um caminho para execução das funcionalidades//
