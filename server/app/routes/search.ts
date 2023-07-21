import express from 'express';
import { searchAll } from '../controllers/search';

const searchRouter = express.Router();

searchRouter.get('/', searchAll);

export default searchRouter;
