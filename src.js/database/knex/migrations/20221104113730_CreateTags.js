exports.up = knex=>knex.schema.createTable("tags", table=> {
    //montando estrutura da tabela "notes"
    
    table.increments("id");
    table.integer("note_id").references("id").inTable("notes").onDelete("CASCADE");//caso exclue a nota, a tag também sera.
    table.integer("user_id").references("id").inTable("users");
    table.text("name");
    // relacionando a foreign key com a promary key da tabela de ''users''


})


exports.down = knex=>knex.schema.dropTable("tags");   
  