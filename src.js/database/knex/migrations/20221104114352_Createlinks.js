exports.up = knex=>knex.schema.createTable("links", table=> {
    //montando estrutura da tabela "notes"
    
    table.increments("id");
    table.integer("note_id").references("id").inTable("notes").onDelete("CASCADE");//caso exclue a nota, a tag também sera.
    table.text("url");
    
    table.timestamp("created_at").default(knex.fn.now())


})

exports.down = knex=>knex.schema.dropTable("links");   
  