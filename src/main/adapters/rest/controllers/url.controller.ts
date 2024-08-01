import { Request, Response } from "express";
import logger from "../../../config/logger.config";
import { URLUseCase } from "../../../domain/usecases/url.usecase";
import { IURLRequestDTO } from "../../dtos/url-request.dto";
import { URLValidator } from "../validators/url.validator";
import { ZodErrorFormater } from "../../../utils/zod-error-format.utils";

export class URLController {
	public static async show(request: Request, response: Response) {
		logger.info(`Short URL received, checking if it exists...`);
		let original;
		try {
			original = await URLUseCase.findOriginalURL(
				request.params["shorten"],
			);
		}
		catch (err) {
			logger.error("[HTTP:404] Could not find the original URL")
			return response.status(404).json({
				message: err.message
			})
		}
		logger.warn(`[HTTP:302] Redirecting to ${original}.`);
		return response.status(302).redirect(original);
	}

	public static async create(request: Request, response: Response) {
		const validatorResult = URLValidator.safeParse(request.body);
		if (!validatorResult.success)
			return response.status(403).json({
				message: ZodErrorFormater(validatorResult.error),
			});
		const urlRequestDTO: IURLRequestDTO = validatorResult.data;
		logger.info("Creating shorter url");
		const urlResponse = await URLUseCase.createNewShortURL(urlRequestDTO.url);
		logger.info("[HTTP:201] Shorter URL successfully created, returning it");
		return response.status(201).json(urlResponse);
	}
}
