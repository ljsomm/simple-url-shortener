import { IURLResponseDTO } from "../../adapters/dtos/url-response.dto";

export interface IURLPort {
	createNewShortURL(url: string): Promise<IURLResponseDTO>;
	findOriginalURL(id: string): Promise<string>;
}
