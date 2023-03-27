const sqlite3=require("sqlite3") //drive que conecta
const sqlite=require("sqlite") //o que realmente conecta
const path=require("path")

async function sqliteConnection(){
    const database= await sqlite.open({
        filename:path.resolve(__dirname, "..", "database.db"),
        //onde quero salvar o arquivo
        /*path: biblioteca para lidar com acesso de diretórios
                em diferentes sistemas. 
                -__dirname : acessa o diretório onde está o projeto
                            (sqlite neste caso)
                - "..": voltar uma pasta para trás
                -"database.db": criar arquivo com esse nome
                */
        driver:sqlite3.Database /*drive que vai estabelecer a comunicação
        com a base de dados */
                                

        
    });
    return database;
    
}

module.exports=sqliteConnection;