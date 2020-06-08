import knex from '../database/connection';
import {Request, Response} from 'express';

class PointsController{
    async create(request:Request, response:Response) {      
        const { image, name, email, whatsapp, latitude, longitude, city, state, items } = request.body;
    
        // Create Transaction
        const trx = await knex.transaction();

        try {    
            const point = { image: request.file.filename, name, email, whatsapp, latitude, longitude, city, state }
            const point_id = await trx.table('tb_points').insert(point);
        
            const point_items = items.split(',')
                                     .map((item_id: string) => Number(item_id.trim()))
                                     .map((item_id: Number) => {
                return {                  
                    item_id: item_id,            
                    point_id: point_id[0]
                }
            });    
      
            await trx.table('tb_point_items').insert(point_items);
            
            trx.commit();    
            return response.json({id: point_id[0], ...point }).status(200); 
        } catch (error) {
            trx.rollback();    
            return response.json({status_code:'500', error_message:`Occur an error, please, try again later`}).status(500); 
        }            
    }

    async get(request:Request, response:Response) {      
        const {city, state, items} = request.query;
     
        let points = knex.table('tb_points')
                         .join('tb_point_items', 'tb_points.id', '=', 'tb_point_items.id');                       
        
        if(city)
            points = points.where('city', 'like', `%${String(city)}%`);

        if(state)
            points = points.where('state', 'like', `%${String(state)}%`);
        
            if(items){
                const parsedItems = String(items)
                .split(',')
                .map(item => Number(item.trim())); 

                points = points.whereIn('tb_point_items.item_id', parsedItems);      
            }
                                                                                           
        var filtered = await points.distinct().select('tb_points.*');  
        
        const serialized = filtered.map(points => {
            return  {
                ...points,
                image_url:  `${request.protocol}://${request.hostname}:${request.socket.localPort}/uploads/${points.image}`             
            }
        });
                       
        response.json(serialized).status(200);      
    }

    async getById(request:Request, response:Response) {      
        const id_parameter = Number(request.params.id);
    
        const point = await knex.table('tb_points').where('id', id_parameter).select('*').first();
    
        const items = await knex.table('tb_items')
                          .join('tb_point_items', 'tb_items.id', '=', 'tb_point_items.item_id')
                          .where('tb_point_items.point_id', id_parameter);

        if(point){            
            response.json({point, items}).status(200);
        }
        else{        
            response.json({status_code:'404', error_message:`The point, ${id_parameter}, was not found`}).status(404);
        }      
    }
}

export default PointsController;