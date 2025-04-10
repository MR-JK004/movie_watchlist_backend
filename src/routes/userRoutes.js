import { Router } from "express";
import userService from "../services/userService.js"

const routes = Router();

routes.post('/',userService.createUser);
routes.post('/login',userService.authenticateUser);

export default routes;