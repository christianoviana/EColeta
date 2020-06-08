import express from 'express';
import knex from './database/connection';
import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';
import multer from 'multer';
import multerConfig from './config/multer';

const routes = express.Router();
const upload = multer(multerConfig);

const pointsController = new PointsController();
const itemsController = new ItemsController();

routes.get('/items', itemsController.get);
routes.get('/items/:id', itemsController.getById);

routes.post('/points', upload.single('image'), pointsController.create);
routes.get('/points', pointsController.get);
routes.get('/points/:id', pointsController.getById);

export default routes;