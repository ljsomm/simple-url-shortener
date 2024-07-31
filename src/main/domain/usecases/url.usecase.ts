import { URLRepository } from "../../adapters/datasources/repositories/url.repository";
import { IURLResponseDTO } from "../../adapters/dtos/url-response.dto";
import config from "../../config";
import logger from "../../config/logger.config";
import { IURLPort } from "../../ports/in/url.port";

export const URLUseCase: IURLPort = {
	async createNewShortURL(url: string): Promise<IURLResponseDTO> {
		logger.info("Saving url on database");
		const URLRecord = await URLRepository.save({
			original: "",
			id: "nanoid()",
		});
		return {
			shortened: `http:/`,
		};
	},
	findURL(id: string): void {
		logger.info(`Selecting URL mapping by id ${id}`);
		URLRepository.findByID(null);
	},
};
