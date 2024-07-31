import { Request, Response } from "express";
import logger from "../../../config/logger.config";
import { URLUseCase } from "../../../domain/usecases/url.usecase";

let sum = 0;

export class URLController {
	public static async show(request: Request, response: Response) {
		logger.info(`Redirecting... Total: ${sum}`);
		const app = await URLUseCase.findURL(null);
		sum++;
		return response.status(200).json(app);
	}

	public static create(request: Request, response: Response) {
		logger.info("Creating shorter url");
		const app = URLUseCase.createNewShortURL(null);
		return response.status(201).json({});
	}
}
