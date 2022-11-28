import { Router } from 'express';
import createTripController from '../controllers/trip/create.controller.js';
import tripCreateDTO from '../dto/trip/create.dto.js';
import authTokenController from '../controllers/auth.controller.js';

const tripRouter = Router();

tripRouter.post(
	'/create',
	authTokenController,
	tripCreateDTO,
	createTripController
);

export default tripRouter;
