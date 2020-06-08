import Knex from 'knex';

export async function seed(knex:Knex){
    await knex.table('tb_items').insert([
        {title: 'Lâmpadas', image: 'lampadas.svg'},
        {title: 'Pilhas e Baterias', image: 'pilhas-baterias.svg'},
        {title: 'Papéis e Papelão', image: 'papeis-papelao.svg'},
        {title: 'Resíduos Eletrônicos', image: 'residuos-eletronicos.svg'},
        {title: 'Resíduos Orgânicos', image: 'residuos-organicos.svg'},
        {title: 'Óleo de Cozinha', image: 'oleo.svg'},
    ])
}