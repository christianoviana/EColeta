import Knex from 'knex';

export async function up(knex : Knex){
    return knex.schema.createTable('tb_points', table =>{
        table.increments('id').primary(),
        table.string('image').notNullable(),
        table.string('name', 150).notNullable(),
        table.string('email', 80).notNullable(),
        table.string('whatsapp', 20).notNullable(),
        table.decimal('latitude').notNullable(),
        table.decimal('longitude').notNullable(),  
        table.string('city', 80).notNullable(),
        table.string('state', 80).notNullable()
    });
}

export async function down(knex : Knex){
    return knex.schema.dropTable("tb_points");
}