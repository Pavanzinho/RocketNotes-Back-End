// Update with your config settings.
const path =require('path')
module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname,'src.js','database','database.db' )
    },
    
    useNullAsDefault:true,

    pool:{
      afterCreate:(conn,cb)=>conn.run("PRAGMA foreign_keys = ON", cb) //ativando delete em cascata
    },
    migrations:{
      directory: path.resolve(__dirname,'src.js','database','knex','migrations')
    },
  },
};
