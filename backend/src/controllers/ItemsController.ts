import knex from '../database/connection';
import {Request, Response} from 'express';

class ItemsController{
    async get(request:Request, response:Response) {      
        const search = request.query.search;
        const data = search ? await knex.table('tb_items').where('title', 'like', `%${search}%`).select('*') 
                            : await knex.table('tb_items').select('*');
    
        const serialized = data.map(items => {
            return  {
                id: items.id,
                title: items.title,
                image_url:  `${request.protocol}://${request.hostname}:${request.socket.localPort}/uploads/${items.image}`             
            }
        });
    
        response.json(serialized).status(200);     
    }

    async getById(request:Request, response:Response) {      
        const id_parameter = Number(request.params.id);
    
        const item = await knex.table('tb_items').where({id:id_parameter}).select('*').first();
    
        if(item){
            const serialized =  {
                id: item.id,
                title: item.title,
                image_url:  `${request.protocol}://${request.host}:${request.socket.localPort}/uploads/${item.image}`             
            }
            
            response.json(serialized).status(200);
        }
        else{        
            response.json({status_code:'404', error_message:`The item, ${id_parameter}, was not found`}).status(404);
        }      
    }
}

export default ItemsController;