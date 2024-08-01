import { URLEntity } from "../domain/entities/url.entity";
import { IURLResponseDTO } from "../adapters/dtos/url-response.dto";
import config from "../config";

export const URLMapper = {
	toDTO(entity: URLEntity): IURLResponseDTO {
		return {
			shortened: `${config.APP_URL}:${config.SERVER_PORT}/${entity.id}`,
		};
	},
};
