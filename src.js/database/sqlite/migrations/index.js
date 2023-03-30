const sqliteConnection= require('../../sqlite') //assincrono.
const createUsers=require('./createUsers')
const createNotes=require("./createNotes")
const createLinks=require("./createLinks")
const createTags=require("./createTags")

// async function migrationRun(){
//     const schemas=[
//         createUsers
//     ].join('');


//     sqliteConnection()
//     .then(db=>db.exec(schemas))
//     .catch(error=>console.error(error));

// }

async function migrationsRun(){
    const schemas=`${createUsers};${createNotes};${createLinks};${createTags}`

    const db=await sqliteConnection()
    await db.exec(schemas).catch(error=>console.error(error))
}

module.exports=migrationsRun;