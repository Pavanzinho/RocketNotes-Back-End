//MIGRATION DE NOTAS.
exports.up = knex=>knex.schema.createTable("notes", table=> {
    //montando estrutura da tabela "notes"
    
    table.increments("id");
    table.text("title");
    table.text("description");
    table.integer("user_id").references("id").inTable("users");
    // relacionando a foreign key com a promary key da tabela de ''users''

    table.timestamp("created_at").default(knex.fn.now()); //funções específicas do knex.
    table.timestamp("updated_at").default(knex.fn.now());
})


exports.down = knex=>knex.schema.dropTable("notes");   
  

