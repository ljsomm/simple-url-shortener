import { Request, Response } from "express";
import logger from "../../../config/logger.config";
import { URLUseCase } from "../../../domain/usecases/url.usecase";
import { IURLRequestDTO } from "../../dtos/url-request.dto";
import { URLValidator } from "../validators/url.validator";

export class URLController {
	public static async show(request: Request, response: Response) {
		logger.info(`Short URL received, checking if it exists...`);
		const original = await URLUseCase.findOriginalURL(
			request.params["shorten"],
		);
		logger.info(`Redirecting to ${original}.`);
		return response.status(302).redirect(original);
	}

	public static async create(request: Request, response: Response) {
		const validatorResult = URLValidator.safeParse(request.body);
		if (!validatorResult.success)
			return response.status(403).json({
				message: JSON.parse(validatorResult.error.message).reduce(
					(accumulator, current) => {
						return {
							message: `${accumulator.message};${current.message}`,
						};
					},
				).message,
			});
		const urlRequestDTO: IURLRequestDTO = validatorResult.data;
		logger.info("Creating shorter url");
		const urlResponse = await URLUseCase.createNewShortURL(urlRequestDTO.url);
		logger.info("Shorter URL successfully created, returning it");
		return response.status(201).json(urlResponse);
	}
}
