import { URLRepository } from "../../adapters/datasources/repositories/url.repository";
import { IURLResponseDTO } from "../../adapters/dtos/url-response.dto";
import logger from "../../config/logger.config";
import { URLMapper } from "../../mappers/url.mapper";
import { IURLPort } from "../../ports/in/url.port";

export const URLUseCase: IURLPort = {
	async createNewShortURL(url: string): Promise<IURLResponseDTO> {
		logger.info("Creating URL mapping...");
		const URLRecord = await URLRepository.save({ original: url });
		logger.info("URL mapping successfully saved on database");
		return URLMapper.toDTO(URLRecord);
	},
	async findOriginalURL(id: string): Promise<string> {
		logger.info(`Selecting URL mapping by id ${id}`);
		let URLRecord;
		try {
			URLRecord = await URLRepository.findByID(atob(id));
			if(!URLRecord) throw new Error("This short URL record was not found on database")
		}
		catch(err) {
			throw new Error(`It was not possible to retrieve original URL. Reason: ${err.message}`)
		}
		logger.info(`URLRecord successfully found`);
		return URLRecord.original;
	},
};
