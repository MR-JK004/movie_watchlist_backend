import { Router } from "express";
import movieService from "../services/movieService.js"

const routes = Router();

routes.post('/addMovie',movieService.addMovie);
routes.put('/update_movie/:id', movieService.updateMovie);
routes.get('/',movieService.getAllMovies);  
routes.get('/:id',movieService.getMovieById)
routes.delete('/delete/:id',movieService.deleteMovie);

export default routes;