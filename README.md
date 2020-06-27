O projeto de estudo 'Ecoleta' foi desenvolvido durante a semana 'Next Level Week'. O objetivo deste site é criar pontos de coletas de resíduos. 

## Scripts

No diretório do projeto, você pode executar os comandos:

## Frontend
### `npm start`

Executa o site (frontend) no ambiente de desenvolvimento.<br />
Abrir [http://localhost:3000](http://localhost:3000) para visualizar o site no navegador.

## Backend
### `npm run knex:migrate` - Cria as tabelas do banco de dados (Sqlite)
### `npm run knex:seed`    - Inicializa a tabela de itens com as imagens padrões
### `npm run dev`

Executa a api rest no ambiente de desenvolvimento.<br />
Abrir [http://localhost:9088](http://localhost:9088) para visualizar as chamadas da api no navegador.

http://localhost:9088/items <br />
http://localhost:9088/items/{id} <br />
http://localhost:9088/points <br />
http://localhost:9088/points/{id} 

## Screnshoot

![alt text](https://github.com/christianoviana/ecoleta/blob/master/resources/ecoletas.gif)
