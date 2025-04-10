import { Router } from "express";
import userRoutes from './userRoutes.js'
import movieRoutes from './movieRoutes.js'
// import watchListRoutes from './watchListRoutes.js'

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/movies', movieRoutes);
// routes.use('/watch-list',watchListRoutes);


export default routes;